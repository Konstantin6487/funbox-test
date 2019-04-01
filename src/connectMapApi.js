import { GoogleApiWrapper } from 'google-maps-react';

export default (apiKey = 'AIzaSyB2d1bdCOYuBFnFYah4FOrNFCrdBCCmZcU') => Component => GoogleApiWrapper({ apiKey, libraries: ['places'] })(Component);
