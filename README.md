# MathScienceMusic static site

Preserves the existing public MathScienceMusic website as static HTML, JavaScript, images, fonts and audio. It requires no Heroku dyno, database or Docker runtime.

## Preserved content

- 13 published projects and their original `#/project/<slug>` routes.
- Original animated logo and its 16 referenced audio clips.
- Locally preserved project thumbnails, hero images and available partner images.
- Existing public resource links and YouTube embeds.
- The existing Mailchimp signup form submits directly to Mailchimp; no subscription was submitted during verification.

The public content was captured on 2026-10-09 from the existing public page. Public templates and logo code were reconciled with revision `d9cdfb9dfbdb6634b60f23205d565d88cb80ec63` of the historical application. This repository contains only the public static result, not historical private Git objects, database users, protected configuration, credentials or a CMS.

## Hosting and editing

Publish the root of `main` using GitHub Pages. `.nojekyll` prevents template processing. Paths are relative so the site works at a Pages project URL and at a future custom domain. No custom-domain CNAME is included until domain ownership and DNS routing are verified. Existing Heroku and DNS resources remain the rollback path until approved cutover and acceptance.

Review content changes as repository commits. `projects.json` is a readable preservation copy of the public project records. The checked-in `index.html` contains the same data for the legacy client; changing JSON alone does not change the page. The preserved local build kit can regenerate both. A subsequent maintenance change can replace the legacy Angular client without requiring a server.

## Changes made for static delivery

- Relative asset paths, local project media/fonts, and an embedded icon font.
- Guarded the original home-route null lookup.
- Removed legacy analytics injection and the old Mailchimp validation initializer; the normal HTML form endpoint and fields remain.
- Localhost previews suppress form submission.

## Known limits

Several historical external partner-logo URLs no longer return images. Their original references are retained where no verified copy was available. Linked third-party applications, lessons, videos and Mailchimp remain separate dependencies; their availability is not guaranteed by preserving this site. Video URLs were retained, but full playback and signup delivery require acceptance testing. This is the public website export, not a database or CMS backup.

Existing content and third-party assets retain their original rights and attribution. No new license is granted by this preservation copy.
