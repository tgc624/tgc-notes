# Clipboard bookmarklet

## Code

```js
javascript: (() => {
  const MODAL_ID = "this-is-modal-of-clipboard-extension";
  const TEXTS = [
    { text: "clipboard item 1" },
    { text: "clipboard item 2" },
    { text: "multiline\ntext" },
  ];
  const targetElement = document.getElementById(MODAL_ID);
  if (targetElement && typeof targetElement.showModal === "function") {
    /* If call showModal function before closing the modal, the error will occur. So close the modal just in case. */
    typeof targetElement.close === "function" && targetElement.close();
    targetElement.showModal();
    return; /* If the modal already exists, only show it(without create process). */
  }
  const createModal = (modalId, texts) => {
    /* Define modal below. */
    const modal = document.createElement("dialog");
    modal.id = modalId;
    modal.style.padding = 0;
    modal.style.border = "none";
    /* The modal content will stop click propagation. So below code means clicking outside the modal. And then it will be closed. */
    modal.onclick = (event) => modal.close();
    /* Define modal content below. */
    const modalContent = document.createElement("div");
    /* Stop click event propagation to identify clicking outside the modal and inside. */
    modalContent.onclick = (event) => event.stopPropagation();
    /* Add texts to modal content. */
    texts
      .map(({ text }) => {
        const p = document.createElement("p");
        p.textContent = text;
        p.onclick = () => {
          navigator.clipboard.writeText(text).then(() => {
            p.style.color = "forestgreen";
            setTimeout(() => (p.style.color = ""), 500);
          });
        };
        return p;
      })
      .forEach((pTag) => modalContent.appendChild(pTag));
    /* Append the modal content to the modal. */
    modal.appendChild(modalContent);
    return modal;
  };
  const createModalStyle = (modalId) => {
    /* Hover witch is pseudo-classes can't write on style attribute. So create style tag to apply it. */
    const style = document.createElement("style");
    style.innerText = `#${modalId} p:hover{color:orange;cursor:pointer}`;
    return style;
  };
  /* Create DOMs. */
  const modal = createModal(MODAL_ID, TEXTS);
  const modalStyle = createModalStyle(MODAL_ID);
  /* Append created DOMs. */
  document.body.appendChild(modal);
  document.body.appendChild(modalStyle);
  /* Open modal. */
  modal.showModal();
})();
```

## Note

- Bookmarklet will parse javascript as single line. So it's better to use `/* ~ */` symbol instead of `//`.
- If you register another text, edit `TEXTS` variable.
- You can use multiline text by using `\n` between the texts.
