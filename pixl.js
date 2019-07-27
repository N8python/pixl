function renderPixl() {
    const source = document.querySelector(`[lang="pixl"]`).innerHTML;
    document.querySelector("[lang=pixl]").remove();
    if (typeof source !== "string") {
        throw new Error("Invalid source or source not found.");
    }
    const lines = source.split("\n");
    const cmds = lines.map(line => line.trim().split(" "));
    if (cmds[0][0] !== "GRID") {
        throw new Error("Commands must start with grid.");
    }
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    let pxSize;
    document.body.appendChild(canvas);
    cmds.forEach(([cmd, ...args]) => {
        switch (cmd) {
            case "GRID":
                pxSize = canvas.width / args[0];
                break;
            case "COLOR":
                ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
                break;
            case "PIXEL":
                ctx.fillRect(args[0] * pxSize, args[1] * pxSize, pxSize, pxSize);
                break;
        }
    })
}
export default renderPixl;
