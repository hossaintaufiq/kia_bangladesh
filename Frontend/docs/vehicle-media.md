# Vehicle media

Every vehicle page is built from one template (`src/components/vehicle/VehiclePage.tsx`),
the words in `src/data/vehicles/{slug}.ts` and the files in this folder.

**To replace the pictures, overwrite the files below with the same names.
No code changes are needed.** Keep the format (`.webp` images, `.mp4` videos).

```
public/vehicles/{slug}/
  images/   hero.webp, closing.webp, cabin.webp, spotlight.webp, nav.webp,
            detail-1..4.webp, feature-1..4.webp, safety-1..4.webp,
            spotlight-detail-1..2.webp
  videos/   film.mp4, tour.mp4, clip-1.mp4, clip-2.mp4, safety-clip.mp4
            + a poster for each: film-poster.webp, tour-poster.webp, …
  360/{colour}/01.webp … 72.webp
```

## What each file is

| File | Where it shows | Suggested size |
|---|---|---|
| `images/hero.webp` | Top of the page, and the card on the home page | 2400 × 1350, subject lower-centre |
| `images/closing.webp` | Full-width image behind the last call to action | 2400 × 1350 |
| `images/cabin.webp` | Wide cockpit image opening the Interior section | 2400 × 1000 |
| `images/spotlight.webp` | Large image opening the spotlight section | 2400 × 1200 |
| `images/spotlight-detail-1..2.webp` | Two captioned images under the spotlight | 1600 × 800 |
| `images/detail-1..4.webp` | Four design close-ups (grille, lamps, wheel …) | 1600 × 1000 |
| `images/feature-1..4.webp` | Four interior features | 1600 × 1000 |
| `images/safety-1..4.webp` | Four technology and safety images | 1600 × 800 |
| `images/nav.webp` | Thumbnail in the Vehicles menu, transparent background | 480 × 194 |
| `videos/film.mp4` | Large video at the start of the Design section | 1920 × 1080, 10–25 s, under 5 MB |
| `videos/tour.mp4` | Video behind the closing text section | 1920 × 1080, under 5 MB |
| `videos/clip-1.mp4`, `clip-2.mp4` | Two clips in the Interior section | 1600 × 1000 |
| `videos/safety-clip.mp4` | Clip in the safety section | 1600 × 800 |
| `videos/*-poster.webp` | Still shown before the video loads (a frame of the video) | same ratio as the video |
| `360/{colour}/NN.webp` | The 360° viewer | see below |

Other image shapes still work: the page crops with `object-cover`, so keep the
subject near the middle.

## 360° frames

- One folder per colour. Folder names are the `key` of each colour in the vehicle's data file.
- Frames are numbered `01.webp`, `02.webp`, … and make one full turn. The frame
  count is `colours.frames` in the data file (72 now, one every 5°).
- Frame 01 is the front view, and the car turns the same way in every colour.
- Same camera, same size and same car position in every frame and every colour.
  Transparent background. About 1300 px wide is plenty. Keep each frame small
  (about 50 KB): 72 frames load together.
- If the car looks too big or small in the viewer, change `colours.zoom`.

## Checking your work

```
npm run check:assets
```

Lists any file a page needs that is missing, and any file in `images/` or
`videos/` that nothing uses. It exits with an error if something is missing, so
it can run in CI.

## Adding another vehicle

1. Copy `src/data/vehicles/sonet.ts` to `{slug}.ts` and write the text.
2. Add it to `VEHICLES` in `src/data/vehicles/index.ts`. The page, menu and home
   page card appear automatically.
3. Add the media in `public/vehicles/{slug}/` using the table above.
4. Run `npm run check:assets`.

The number of details, features, safety items and spotlight details can change
in the data file. The checker and the page follow the lists. The two interior
clips and the three videos (`film`, `tour`, `safety-clip`) are fixed.
