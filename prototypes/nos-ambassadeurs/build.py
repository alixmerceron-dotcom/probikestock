"""Assemble apercu.html (autonome) à partir de src.html : polices du site + logo du thème."""
import base64, pathlib
here = pathlib.Path(__file__).parent
b64 = lambda p: base64.b64encode((here / p).read_bytes()).decode()
logo = (here / "logo.svg").read_text()
out = (here / "src.html").read_text() \
    .replace("__OUTFIT__", b64("fonts/Outfit-var.woff2")) \
    .replace("__INSTRUMENT__", b64("fonts/InstrumentSans-var.woff2")) \
    .replace("__LOGO__", logo) \
    .replace("__PHOTO__", "data:image/jpeg;base64," + b64("photos/course.jpg"), 1) \
    .replace('src="__PHOTO__"', 'data-same-photo src=""')
(here / "apercu.html").write_text(out)
print(len(out))
