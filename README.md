# React cat image auto fetcher 🐱

## Notes
- File structure could be better in the future, e.g. split components directory into its categories. Also it's a good idea to have a separate components that have specific logical behaviour in them (e.g. MapAdsToResult). For now, this is perfectly fine as we are dealing only with few of them. 
- All the constants that can be reused can be moved to a constants file e.g. number of items fetched from API and number of placeholder items displayed.
- Got Google Ads somehow working, but I see that the implementations is glitchy, ads don't load past certain time. Probably an issue that we are always using the same ad path, but at the moment I don't have my own google ad accounts so can't play around with it more.
