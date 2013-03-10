function Timeline() {

    function frame(time) {

        var event = new CustomEvent("Timeline:frame", {
            detail: {
                time: new Date()
            },
            bubbles: false,
            cancelable: true
        });

        document.dispatchEvent(event);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}