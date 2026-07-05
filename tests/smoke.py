"""End-to-end smoke test for the AI Blog.

Run via the webapp-testing skill's server helper, which starts the dev
server and tears it down automatically:

    .venv/bin/python .claude/skills/webapp-testing/scripts/with_server.py \\
        --server "npm run dev" --port 3000 -- .venv/bin/python tests/smoke.py

Covers the three interactive features that unit/type checks can't catch:
theme toggle persistence, tag filtering, and the calendar archive.
"""

import sys

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

failures = []


def check(label, condition):
    status = "PASS" if condition else "FAIL"
    print(f"[{status}] {label}")
    if not condition:
        failures.append(label)


def main():
    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.on(
            "console",
            lambda msg: console_errors.append(msg.text) if msg.type == "error" else None,
        )
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        # --- Home page ---
        page.goto(BASE_URL, wait_until="networkidle")
        check("home page shows all 3 posts", page.locator("main li").count() == 3)

        # --- Theme toggle: default light, click to dark, persists across reload ---
        initial_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
        check("theme defaults to light", initial_theme == "light")

        page.click('button[aria-label="Toggle color theme"]')
        page.wait_for_timeout(200)
        toggled_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
        check("theme toggle flips to dark", toggled_theme == "dark")

        page.reload(wait_until="networkidle")
        reloaded_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
        check("theme choice persists across reload", reloaded_theme == "dark")

        # reset to light for the rest of the run / next run
        page.click('button[aria-label="Toggle color theme"]')
        page.wait_for_timeout(200)

        # --- Tags: /tags/llms lists only the LLM post ---
        page.goto(f"{BASE_URL}/tags/llms", wait_until="networkidle")
        tag_page_text = page.locator("main").inner_text()
        check(
            "tag page includes the tagged post",
            "How Transformers Work" in tag_page_text,
        )
        check(
            "tag page excludes posts without this tag",
            "What Are AI Agents?" not in tag_page_text,
        )

        # --- Archive: highlighted day links to the right post ---
        page.goto(f"{BASE_URL}/archive", wait_until="networkidle")
        post_link = page.locator('a[href^="/posts/"]').first
        check("archive calendar has at least one highlighted day", post_link.count() > 0)
        href = post_link.get_attribute("href") or ""
        post_link.click()
        # Next.js client-side navigation doesn't necessarily produce network
        # activity for wait_for_load_state("networkidle") to key off of, so
        # wait for the URL itself instead of racing a load-state check.
        page.wait_for_url(f"**{href}", timeout=5000)
        check(
            "clicking a highlighted day navigates to that post",
            page.url.endswith(href),
        )

        check("no console/page errors during the run", len(console_errors) == 0)
        if console_errors:
            for err in console_errors:
                print(f"  console error: {err}")

        browser.close()

    print()
    if failures:
        print(f"{len(failures)} check(s) failed:")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)

    print("All checks passed.")


if __name__ == "__main__":
    main()
