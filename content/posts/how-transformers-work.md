---
title: "How Transformers Work, in Plain English"
date: "2026-02-12"
excerpt: "A gentle, jargon-light walkthrough of the transformer architecture that powers modern language models."
tags: ["llms"]
---

Transformers are the architecture behind most modern language models. At a
high level, they process text by:

1. **Tokenizing** input text into small chunks (tokens).
2. **Embedding** each token as a vector of numbers.
3. Using **self-attention** to let each token "look at" every other token and
   decide which ones are relevant to it.
4. Stacking many attention layers to build up increasingly abstract
   representations of the text.
5. Using the final representation to predict the next token, one at a time.

The key innovation over older architectures (like RNNs) is that attention
lets the model consider the *entire* input at once, rather than processing it
strictly left-to-right. This makes transformers both more accurate and far
more parallelizable to train on modern hardware.
