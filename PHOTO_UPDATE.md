# Photography Update — Full Coverage (2026-09-24)

Every media slot on the site now shows a real, properly licensed photograph. Before this
update, 11 slots were rendering the styled placeholder because they had no entry in
`src/images.js`. All images are curated from Wikimedia Commons, verified to load (HTTP 200),
visually reviewed before inclusion, and credited in the UI as their CC licenses require.

## What was empty and what fills it now

### Regions (3 filled)

| Slot | Photo | Credit / License |
|---|---|---|
| Tabuk | Wadi al-Disah canyon — sandstone cliffs and palms | Clemens Schmillen · CC BY-SA 4.0 |
| Najran | Ancient site of Al-Ukhdud | Richard Mortel · CC BY 2.0 |
| Northern Borders | Harvest supermoon rising between mosque domes in the province (2025) | Saudi Press Agency · CC BY-SA 4.0 |

### Moments timeline (8 filled)

| Slot | Photo | Credit / License |
|---|---|---|
| 1824 — Second Saudi State | Old Najdi mud-brick defensive tower, King Abdulaziz Historical Center, Riyadh | Richard Mortel · CC BY 2.0 |
| 1953 — Council of Ministers | Official portrait of King Saud | Public domain |
| 2000 — Supreme Commission for Tourism | Excavated stone walls at Al-Ukhdud, Najran | Richard Mortel · CC BY 2.0 |
| 2016 — Vision 2030 launched | Official SPA portrait of Crown Prince Mohammed bin Salman | Saudi Press Agency · CC BY-SA 4.0 |
| 2017 — Al-Qatt Al-Asiri | Painted house interior with Asiri zigzag motifs, Rijal Almaa | Richard Mortel · CC BY 2.0 |
| 2018 — Al-Ahsa Oasis | Date-palm groves of Al-Ahsa | Yafa.naif · CC BY-SA 4.0 |
| 2019 — Tourist visa introduced | Travellers under the tent canopy of Jeddah's Hajj Terminal | Shah134pk · CC BY-SA 4.0 |
| 2025 — Riyadh Air takes off | Riyadh Air Boeing 787-9 Dreamliner (HZ-RXX) in full livery | kitmasterbloke · CC BY 4.0 |

## How it was done

1. Compared the slot keys the app renders (`trait-*`, `region-*`, `m-*` from `src/data.js`)
   against the entries in `src/images.js` to find the 11 gaps.
2. Searched the Wikimedia Commons API (full-text + category listings) for each subject.
3. Downloaded and visually inspected every candidate — two were rejected in the process:
   a text placard masquerading as an Al-Ahsa photo and a hazy aerial shot of Riyadh's
   airport — and replacements were sourced.
4. Verified all final URLs return HTTP 200, added the entries to `src/images.js` with
   attribution, and confirmed a clean production build (45 slots total).

## Files changed in this update

- `src/images.js` — 11 new curated image entries with credits.
