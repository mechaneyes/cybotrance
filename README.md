# Cybotron
### BK Dashboard
<br>
<br>

## What it is?
This is a dashboard running in the entryway inside my apartment.

The dashboard presents the current time, weather and humidity (an important bit of data when living through NYC summers). It also presents the most recent tweet from https://twitter.com/howltweeter.

Rounding things out is a JS animation lifted from the [codedoodl.es doodle source archive](https://github.com/fluuuid/codedoodl.es-doodles). I really wish I could get to the non-minified version of this doodle ... would love to study how it's built. Ahh vell.

<br><br>

## Weather
I'd originally built something similar using the Weather Underground API. That fell off some time ago, so I turned to Dark Sky. Turns out that's on its way out as well. In steps the [WeatherKit REST API](https://developer.apple.com/documentation/weatherkitrestapi)

<br><br>

## Narrative
I plan on running tweet streams from different bots on the dashboard ... looking to incorporate narratives stretched out over time, and accessed by me asynchronously. For now I've settled on @howltweeter.

<br>

### THE RIGHT SORT
My original idea was to stream [THE RIGHT SORT](https://twitter.com/SceptreBooks/timelines/488586138048004096) one tweet each day. I may fold this into Cybotrance a bit later, but Howl, because it's regularly posting, seemed like an easy integration now.

<br>

### @howltweeter
https://twitter.com/howltweeter
"All of Allen Ginsberg's Howl, One Line Every Hour, Over and Over."

<br>

### Visual Artists
I'm also considering accounts that present visual art, and so am thinking about accounts like [@zachlieberman](https://twitter.com/zachlieberman). Right now I don't have a layout that would accept this type of content, so it's just an idea atm.

<br><br>

## Design
![Figma Sketches](./screenshot-figma.gif)
