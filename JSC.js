const CONFIG = {
    PUBLIC_KEY: "Q_ctpkeGNZ8sbvynk",
    SERVICE_ID: "service_5521bbh",
    TEMPLATE_ID: "template_y4d1acp"
};

document.addEventListener("DOMContentLoaded", () => {

    emailjs.init(CONFIG.PUBLIC_KEY);

    const form = document.getElementById("api-contact-form");
    const log = document.getElementById("system-log");

    function writeLog(msg, type="info") {
        const p = document.createElement("p");
        p.textContent = `> ${msg}`;
        p.style.color =
            type === "error" ? "red" :
            type === "success" ? "cyan" : "lime";

        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = document.getElementById("submit-btn");

        const name = form.name.value.trim();
        const email = form.user_email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            writeLog("Campos incompletos", "error");
            return;
        }

        writeLog("Enviando datos...");

        btn.disabled = true;

        try {
            await emailjs.sendForm(
                CONFIG.SERVICE_ID,
                CONFIG.TEMPLATE_ID,
                form
            );

            writeLog("Mensaje enviado correctamente", "success");

            form.reset();

        } catch (err) {
            writeLog("Error al enviar mensaje", "error");
        }

        btn.disabled = false;
    });

    startPing();
    matrixEffect();
});

/* PING REAL */
function startPing() {
    const pingText = document.getElementById("ping-text");

    setInterval(async () => {
        const start = performance.now();

        try {
            await fetch("https://jsonplaceholder.typicode.com/posts/1");
            const ms = Math.floor(performance.now() - start);
            pingText.textContent = `LATENCIA: ${ms}ms`;
        } catch {
            pingText.textContent = "ERROR";
        }

    }, 4000);
}

/* MATRIX */
function matrixEffect() {
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01ABCXYZ";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00f2ff";
        ctx.font = fontSize + "px monospace";

        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        });
    }

    setInterval(draw, 50);
}