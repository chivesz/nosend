---
title: "Squoosh Alternative: Batch, HEIC, and Still 100% Local"
description: "Squoosh is Google's client-side image compressor and nosend's closest rival. How they compare on batch processing, HEIC support, codec control, and maintenance."
pubDate: 2026-09-02
---

Squoosh and [nosend](https://nosend.io) share the same core idea: compress images in the browser and upload nothing. Squoosh, from Google Chrome Labs, does it with a set of WebAssembly codecs and deep per-image controls. nosend does it with the Canvas API and a much simpler interface built for volume.

If you already believe in client-side compression, choosing between them comes down to how many images you have and how much tuning you want to do.

## nosend vs Squoosh

| | nosend | Squoosh |
|---|---|---|
| Where files are processed | Your browser | Your browser (same) |
| Multiple files at once | Yes, unlimited | One image at a time |
| HEIC / iPhone photos | Yes | No |
| Codec control | Quality slider | Deep per-codec settings (MozJPEG, OxiPNG…) |
| AVIF output | No | Yes |
| Before/after comparison | Size and savings per file | Side-by-side visual slider |
| Actively maintained | Yes | Largely dormant |
| Metadata (EXIF, GPS) | Stripped automatically | Stripped |
| Open source | Yes (MIT) | Yes (Apache-2.0) |

## Where nosend wins

- **Batch** — Squoosh handles one image at a time. nosend takes a whole folder at once and gives you a ZIP on desktop, or the native share sheet on mobile.
- **HEIC** — nosend decodes iPhone HEIC and HEIF files directly. Squoosh can't open them.
- **Maintenance** — as of this writing, Squoosh's development has been largely dormant for years. Open issues have piled up and its codecs haven't kept pace. nosend is actively maintained.
- **Simplicity** — drop files, download results. There's no codec menu to learn.

## Where Squoosh wins

Squoosh is the better tool when you're optimizing a *single* important image. Its side-by-side comparison slider, per-codec settings, and AVIF output give you a level of control nosend deliberately doesn't. If you want to hand-tune one hero image or export AVIF, use Squoosh.

## Both keep your files local

Worth being clear: Squoosh is not a privacy problem. Like nosend, it processes everything in your browser with no upload — it's Google's own demonstration that client-side compression works. This isn't a privacy pitch against Squoosh.

It's about batch processing, HEIC support, and whether the tool is still being worked on. If those matter to you, nosend covers the same client-side ground with less friction. If you want to read more about which tools actually upload your files, see [Are online image compressors safe?](/blog/are-online-image-compressors-safe)

## The bottom line

Squoosh is a great tool that Google has mostly stopped developing. For fine-tuning one image or exporting AVIF, it's still worth using. For a batch of photos, iPhone HEIC files, or a tool that's actively maintained — nosend does the same job in the browser with a fraction of the clicks.

Try it at [nosend.io](https://nosend.io).

---

**Related:**
- [TinyPNG Alternative: Free, No 5MB Limit, No Upload](/blog/tinypng-alternative)
- [Are Online Image Compressors Safe to Use?](/blog/are-online-image-compressors-safe)
- [How to Convert HEIC to JPG Without Uploading Your Photos](/blog/heic-to-jpg-without-uploading)
- [How to Compress Images Without Uploading Them](/blog/compress-images-without-uploading)
- [nosend on GitHub](https://github.com/chivesz/nosend)
