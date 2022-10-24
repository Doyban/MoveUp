function showInterstitialFunc() {
  let interstitial;

  document.addEventListener('deviceready', async () => {
    interstitial = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-4865595196880143~2862626271',
    })

    interstitial.on('load', (evt) => {
      // evt.ad
    })

    await interstitial.load()
    await interstitial.show()
  }, false)

  document.addEventListener('admob.ad.dismiss', async () => {
    // Once a interstitial ad is shown, it cannot be shown again.
    // Starts loading the next interstitial ad as soon as it is dismissed.
    await interstitial.load()
  })
}
