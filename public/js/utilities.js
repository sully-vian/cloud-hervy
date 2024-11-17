/**
 * Resize the input textarea to fit the content by using the autosize library.
 */
export function resizeInputTextarea() {
    autosize(document.getElementById("desc-input"));
}
