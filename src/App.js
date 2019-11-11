import React from 'react';
import CompApp from 'compWebsite';
import MobileApp from 'mobileApp';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'shared/elements';


/* ANCHOR  Main app, renders all components and is attached to the DOM
 *
 * Suggestion: Add the Name: Comment Anchors Extension (for VS Code atleast)
 * VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors 
 */


// TEMPORARY, If its true the website shows mobile app on desktop also, just for developement
// TODO remove this
let dev = true;

function App(){
  //checks whether user is on mobile
  if (typeof window.orientation !== "undefined" || dev){
    return (
      <ErrorBoundary>
        <BrowserRouter basename="/Frontend">
          <MobileApp />
        </BrowserRouter>
      </ErrorBoundary>
    );
  } else {
    return (
      <ErrorBoundary>
        <CompApp />
      </ErrorBoundary>
    );
  }
}

export default App;
