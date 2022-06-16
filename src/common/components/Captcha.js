export default function Captcha() {
    async function loadCaptcha() {
        let captchaId = null;

        try {
            const response = await fetch("/v2/captcha", {
                method: 'POST',
                body: JSON.stringify({ level: "hard", media: "image/png", "input_type": "text", size: "350x100" })
            });

            const result = await response.json();
            if (result.ok) {
                console.log(result);
                captchaId = result.id;
            } else {
                console.err(result);
            }



        } catch (error) {
            console.err(error);
        }
    }

    return (
        <>
            <button>Get Captcha</button>

        </>
    )

}