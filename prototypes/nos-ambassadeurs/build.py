"""Assemble apercu.html (autonome, sans dépendance au JavaScript) à partir de src.html."""
import base64, html, pathlib
here = pathlib.Path(__file__).parent
b64 = lambda p: base64.b64encode((here / p).read_bytes()).decode()
title = " ".join(f'<span class="w" aria-hidden="true"><span class="wi" style="--i:{i}">{html.escape(w)}</span></span>'
                for i, w in enumerate("Nos ambassadeurs".split()))
out = (here / "src.html").read_text() \
    .replace("__OUTFIT__", b64("fonts/Outfit-var.woff2")) \
    .replace("__INSTRUMENT__", b64("fonts/InstrumentSans-var.woff2")) \
    .replace("__TITLE__", title) \
    .replace("__LOGO__", (here / "logo.svg").read_text().replace("#0E1B4D", "#002843")) \
    .replace("__VALERIAN__", "data:image/jpeg;base64," + b64("photos/web/valerian.jpg")) \
    .replace("__PODIUM__", "data:image/jpeg;base64," + b64("photos/web/podium.jpg")) \
    .replace("__LEO__", "data:image/jpeg;base64," + b64("photos/web/leo.jpg"))
(here / "apercu.html").write_text(out)
print(len(out))

