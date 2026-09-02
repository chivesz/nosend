---
title: "TinyPNG Alternative: Free, No 5MB Limit, No Upload"
description: "A fair comparison of nosend and TinyPNG — upload behavior, the 5MB size cap, batch limits, HEIC support, and price. Plus where TinyPNG is still the right tool."
pubDate: 2026-09-02
---

TinyPNG is one of the best-known image compressors on the web, and its PNG compression is genuinely good. If you're looking for an alternative, it's usually for one of three reasons: the 5MB upload limit, the fact that your files go to a server, or you want something open source.

Here's an honest comparison.

## The short version

nosend and TinyPNG both shrink images. The difference is *where* that happens. TinyPNG uploads your file to its servers, compresses it there, and sends it back. [nosend](https://nosend.io) does everything in your browser — the file never leaves your device.

## nosend vs TinyPNG

| | nosend | TinyPNG |
|---|---|---|
| Where files are processed | Your browser — nothing uploaded | Uploaded to TinyPNG's servers |
| File size limit (web) | None | 5 MB per image |
| Batch limit (web) | None | 20 images at a time |
| Input formats | JPG, PNG, WEBP, GIF, HEIC | JPG, PNG, WEBP |
| HEIC / iPhone photos | Yes | No |
| Metadata (EXIF, GPS) | Stripped automatically | Stripped |
| Price | Free, donation-supported | Free web tool; paid API |
| Open source | Yes (MIT) | No |
| Works offline | Yes, after first load | No |

## Where nosend is the better fit

- **Files over 5MB** — full-resolution DSLR shots, iPhone ProRAW, document scans. TinyPNG's web tool rejects them. nosend has no cap because there's no upload to size-limit.
- **Anything sensitive** — IDs, medical documents, financial screenshots, photos of people who haven't consented. No upload means no server to trust and no breach to worry about.
- **iPhone photos** — nosend reads HEIC and HEIF directly. TinyPNG doesn't accept them at all.
- **Large batches** — drop a whole folder at once. TinyPNG's web tool stops at 20 images.
- **You want to read the code** — nosend is MIT-licensed and [on GitHub](https://github.com/chivesz/nosend). TinyPNG is closed source.

## Where TinyPNG is still the right call

Being fair about this matters. TinyPNG's lossy PNG compression — the palette-quantization step that turned "tinypng" into a verb — often produces a smaller PNG than a straight browser re-encode. nosend's PNG output is a lossless re-encode, so for aggressive PNG size reduction TinyPNG can still win on file size. (You can usually close that gap by switching nosend's output format to WEBP.)

And if you need compression *inside* an automated workflow — a build pipeline, a CMS, an image-upload endpoint — TinyPNG's API is built for exactly that. nosend is a manual, one-page tool with no API. Different jobs.

## The 5MB limit, specifically

TinyPNG's free web tool caps uploads at 5MB per image and 20 images per batch. Those limits exist because every file is processed on their infrastructure, and processing has a cost.

nosend has neither limit. Compression runs on your own device using the browser's Canvas API, so the only ceiling is your computer's memory. People routinely run batches of 100+ full-resolution photos through it.

## Is browser compression as good?

For JPG and WEBP, yes — the Canvas API produces size and quality comparable to server-side tools. For PNG, TinyPNG's lossy quantization can produce a smaller file, but nosend's PNG path keeps the image lossless, and exporting as WEBP instead usually beats both.

## The bottom line

If TinyPNG's compression works for you and your files aren't sensitive, it's a solid tool. If you're hitting the 5MB wall, working with iPhone photos, compressing anything private, or you just don't want your files sitting on someone else's server — nosend does the same job without the upload.

Try it at [nosend.io](https://nosend.io).

---

**Related:**
- [Squoosh Alternative: Batch, HEIC, and Still 100% Local](/blog/squoosh-alternative)
- [Are Online Image Compressors Safe to Use?](/blog/are-online-image-compressors-safe)
- [How to Compress PNG Files Without Uploading Them](/blog/compress-png-without-uploading)
- [How to Compress Images Without Uploading Them](/blog/compress-images-without-uploading)
- [nosend on GitHub](https://github.com/chivesz/nosend)
