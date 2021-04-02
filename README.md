# Offline Speech to Text Engine

## Overview
* This application depicts an offline speech to text engine that consists of a limited set of vocabulary 
* The speech recognition is done by a trained model.
* I used [tensorflowjs](https://www.tensorflow.org/js/) to achieve this
    * In particular, I followed this [tutorial](https://codelabs.developers.google.com/codelabs/tensorflowjs-audio-codelab/index.html) for the speech recognition implementation 
* Upon implementation of the speech recognition, the offline capabilities are enabled by deploying the web app as a [PWA](https://web.dev/what-are-pwas/)
    * All required static resources are cached
    * I used a known caching strategy to achieve this. 

## Goal 
* Going forward, I have plans to do either of the following: 
    1. Extrapolate from this initial implementation and train my own model with a larger set of vocabulary
        * I will use either my own data or data acquired from the [Common Voice Project](https://commonvoice.mozilla.org/en)
    2. Extrapolate from this implementation and train my own model using data acquired from [Common Voice Project](https://commonvoice.mozilla.org/en) with hopes of full English speech recognition
    
## Caveat 
* My knowledge in both ML and PWA deployment is beginner at best. Hence, the project is based heavily on a variety of resources. 

## Extra References
* [PWA Deployment](https://www.youtube.com/watch?v=E8BeSSdIUW4)
* [Voice Assistant Web App](https://www.youtube.com/watch?v=M23QOGHymQ4&t=2157s)
