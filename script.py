import os
from playwright.sync_api import sync_playwright

url = "https://el-silencio.netlify.app/recel"  # ← remplace par ton URL

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # ✅ Charger la page
    page.goto(url, wait_until="domcontentloaded")

    # ✅ Attendre que les scripts se lancent
    page.wait_for_timeout(3000)

    # ✅ Scroll progressif pour charger tout le contenu dynamique
    page.evaluate("""
        async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 500;
                const timer = setInterval(() => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 300);
            });
        }
    """)

    page.wait_for_timeout(2000)

    # ✅ Empêcher la duplication des éléments fixed (navbar etc.)
    page.evaluate("""
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.position === 'fixed') {
                el.style.position = 'static';
            }
        });
    """)

    # ✅ Générer le PDF
    page.pdf(
        path="site_final.pdf",
        format="A4",
        print_background=True
    )

    browser.close()

print("✅ PDF généré ici :", os.path.abspath("site_final.pdf"))
