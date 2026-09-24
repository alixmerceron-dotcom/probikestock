import base64, pathlib
root = pathlib.Path(__file__).resolve().parents[2] / "brand/assets/fonts"
b = lambda f: base64.b64encode((root / f).read_bytes()).decode()

def photo(n, pose):
    # Visuel de remplacement duotone (navy/lime) : cycliste en trait, pas de photo sous droits
    bg = ["#0b3a5c", "#073150", "#0a3657"][n]
    road = {"route": "M-10 460 L500 330", "gravel": "M-10 470 C150 400 300 440 500 350", "chrono": "M-10 450 L500 400"}[pose]
    lean = {"route": 0, "gravel": -4, "chrono": 6}[pose]
    return f'''<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Photo de l'athlète (remplacement)">
<defs><linearGradient id="g{n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{bg}"/><stop offset="1" stop-color="#001B2E"/></linearGradient>
<pattern id="p{n}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#C6F000" stroke-opacity=".06" stroke-width="3"/></pattern></defs>
<rect width="400" height="500" fill="url(#g{n})"/><rect width="400" height="500" fill="url(#p{n})"/>
<circle cx="{300 - n*90}" cy="{150 + n*20}" r="95" fill="#C6F000" fill-opacity=".9"/>
<path d="{road}" stroke="#93B5CC" stroke-opacity=".35" stroke-width="2" fill="none"/>
<g transform="translate(200 350) rotate({lean}) translate(-200 -350)" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
 <circle cx="115" cy="370" r="62"/><circle cx="290" cy="370" r="62"/>
 <path d="M115 370 L175 280 L265 280 L290 370 M175 280 L205 372 L265 280 M205 372 L115 370"/>
 <path d="M168 262 L188 262 M265 280 L258 250 L282 246"/>
 <path d="M178 255 L232 205 L268 246" stroke="#C6F000"/>
 <circle cx="248" cy="178" r="20" fill="#fff" stroke="none"/>
 <path d="M232 205 L214 300 L205 372" stroke="#C6F000"/>
</g>
<text x="20" y="480" fill="#93B5CC" font-family="Space Mono, monospace" font-size="12" letter-spacing="3">VOTRE PHOTO ICI · 4:5</text>
</svg>'''

src = pathlib.Path("src.html").read_text()
out = (src.replace("__ARCHIVO__", b("Archivo-900-lat.woff2")).replace("__MONO400__", b("SpaceMono-400-lat.woff2"))
          .replace("__MONO700__", b("SpaceMono-700-lat.woff2"))
          .replace("__PHOTO1__", photo(0, "route")).replace("__PHOTO2__", photo(1, "gravel")).replace("__PHOTO3__", photo(2, "chrono")))
pathlib.Path("apercu.html").write_text(out)
print(len(out))
