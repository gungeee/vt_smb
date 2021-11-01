(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "class": "Player",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B",
  "this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA",
  "this.Container_2792A64E_17CC_071D_41B0_BEA23997C067",
  "this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1",
  "this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F",
  "this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "unregisterKey": function(key){  delete window[key]; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "existsKey": function(key){  return key in window; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C936D10B_DBFB_D836_41AD_141C46244F03"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C91B3150_DBFB_D8D3_41CD_3E5912DB8993"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window30012"
 },
 "class": "Window",
 "id": "window_A5B4034E_B033_8350_41B5_BB7D600CB1E3",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBackgroundOpacity": 1,
 "width": 400,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 3,
 "bodyPaddingTop": 5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 600,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "layout": "vertical",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uidCF48207C_DBFB_D8D3_41A8_4396C14F817B_0",
  "this.htmlText_A5B6D34F_B033_8350_41B4_EC05165F94C0"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "headerBackgroundOpacity": 1,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window31902"
 },
 "class": "Window",
 "id": "window_A6676E9E_B03E_85F3_41E4_948B7B6055DD",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBackgroundOpacity": 1,
 "width": 400,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 3,
 "bodyPaddingTop": 5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 600,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "layout": "vertical",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uidCF4D307A_DBFB_D8D7_41C1_8DF3500AC6AD_0",
  "this.htmlText_A664DE9E_B03E_85F3_41DE_F98844AD3282"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "headerBackgroundOpacity": 1,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C924B134_DBFB_D852_41E6_01AAF87A8860"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C90D815E_DBFB_D8CE_41E9_C6BB07213A05"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A546A58F_B056_87D1_41DA_023A1737100E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_A546A58F_B056_87D1_41DA_023A1737100E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 0)",
   "media": "this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A546A58F_B056_87D1_41DA_023A1737100E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A184484A_B053_8D50_41BE_44B25833C778_camera"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window20105"
 },
 "class": "Window",
 "id": "window_A4FC9A2F_B052_8CD0_41D1_F091E8C8ADEC",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBackgroundOpacity": 0.78,
 "width": 400,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 3,
 "bodyPaddingTop": 5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 600,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "layout": "vertical",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uidCF52C076_DBFB_D8DF_41CC_D812CCD95964_0",
  "this.htmlText_A4FEDA2F_B052_8CD0_41C3_9349BC177215"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "headerBackgroundOpacity": 1,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_CF11D0BD_DBFB_D852_41BB_4F9B25328F55"
},
{
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -6.55,
   "backwardYaw": -179.8,
   "distance": 1,
   "panorama": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -179.8,
   "backwardYaw": -0.13,
   "distance": 1,
   "panorama": "this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99",
 "thumbnailUrl": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_t.jpg",
 "label": "SAM_100_0112",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A55782DF_B036_9D70_41DB_ED0303641EBE",
  "this.overlay_A56B479D_B035_83F0_41E4_AEA28945847D"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -94.54,
   "backwardYaw": 90.27,
   "distance": 1,
   "panorama": "this.panorama_A546A58F_B056_87D1_41DA_023A1737100E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 89.19,
   "backwardYaw": -96.12,
   "distance": 1,
   "panorama": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "SAM_100_0106",
 "id": "panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1",
 "thumbnailUrl": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_A2031161_B075_9F50_41E5_0C5FE55E5A09",
  "this.overlay_A38712DC_B052_FD70_41E5_C8B641083414",
  "this.overlay_A4736C4C_B055_8557_41DE_B895FCDD9336"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C931D119_DBFB_D852_41C1_572311B61CAF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_camera"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "photo_A5D08EFB_B033_8531_41BE_E03C2B6461E0",
 "thumbnailUrl": "media/photo_A5D08EFB_B033_8531_41BE_E03C2B6461E0_t.jpg",
 "width": 535,
 "label": "arca awalokiteswara",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A5D08EFB_B033_8531_41BE_E03C2B6461E0.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 712
},
{
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -179.8,
   "backwardYaw": -6.55,
   "distance": 1,
   "panorama": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.54,
   "backwardYaw": -179.81,
   "distance": 1,
   "panorama": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_A3EE6170_B02D_9F30_415D_B495F865C160",
 "thumbnailUrl": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_t.jpg",
 "label": "SAM_100_0111",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A40695B6_B032_8733_41DA_2F253E75CE0A",
  "this.overlay_A4D90528_B032_84DF_4195_4E865E7E85B2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C92E4126_DBFB_D87E_41E5_8D2B3471E3FF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_CF0770CA_DBFB_D836_41DE_E40A4BAEFCB8"
},
{
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.13,
   "backwardYaw": -179.8,
   "distance": 1,
   "panorama": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047",
 "thumbnailUrl": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_t.jpg",
 "label": "SAM_100_0113",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A4C2D3A7_B036_83D1_41DD_B0EC43B8F3F1",
  "this.overlay_A560448D_B032_85D0_41D7_1491CF5D77C0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.45,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_CF1EE0AF_DBFB_D84D_41E1_0E5D991A9109"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "photo_A69F7948_B03E_8F50_41E5_E4E123135DFA",
 "thumbnailUrl": "media/photo_A69F7948_B03E_8F50_41E5_E4E123135DFA_t.jpg",
 "width": 707,
 "label": "lambang kesultanan palembang",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A69F7948_B03E_8F50_41E5_E4E123135DFA.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 475
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_CF2A90A1_DBFB_D875_41D6_4BC5C09A5DE3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_CF31E093_DBFB_D855_41AA_BAA53B06C64D"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window24787"
 },
 "class": "Window",
 "id": "window_A45E0F06_B02E_84D3_41D9_034DB5D4C259",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBackgroundOpacity": 1,
 "width": 400,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 3,
 "bodyPaddingTop": 5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 600,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "layout": "vertical",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uidCF4E407B_DBFB_D8D5_41C7_86F9C055AD1E_0",
  "this.htmlText_A45DCF06_B02E_84D3_41B0_34DC023F1C32"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "headerBackgroundOpacity": 1,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window18666"
 },
 "class": "Window",
 "id": "window_A37420E2_B06E_9D53_41CE_5EBCFB7E893A",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "bodyPaddingRight": 5,
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBackgroundOpacity": 1,
 "width": 400,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 3,
 "bodyPaddingTop": 5,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 600,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "layout": "vertical",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uidCF4C3079_DBFB_D8D5_41E7_48047828A836_0",
  "this.htmlText_A37250E3_B06E_9D51_41E4_632783FDCEE2"
 ],
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 5,
 "headerBackgroundOpacity": 1,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_C9237142_DBFB_D836_41E7_E342D6E8F9F1"
},
{
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -179.81,
   "backwardYaw": -1.54,
   "distance": 1,
   "panorama": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -94.35,
   "backwardYaw": 75.27,
   "distance": 1,
   "panorama": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531",
 "thumbnailUrl": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_t.jpg",
 "label": "SAM_100_0110",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A388F417_B02E_84F1_41E5_E1ECCB9790CE",
  "this.overlay_A411C962_B02E_8F53_41C0_1ACECF4CD008",
  "this.overlay_A407892E_B033_8CD3_41DE_74672FF0A68B"
 ]
},
{
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 90.27,
   "backwardYaw": -94.54,
   "distance": 1,
   "panorama": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_A546A58F_B056_87D1_41DA_023A1737100E",
 "thumbnailUrl": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_t.jpg",
 "label": "SAM_100_0118",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A42865FA_B055_8730_41E4_1AF47448B262",
  "this.overlay_A6FDC9A3_B03D_8FD0_41B9_9A4CE64ED265",
  "this.overlay_A59BB950_B03D_8F70_41D6_2349278A7A33"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_camera"
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "viewerArea": "this.MainViewer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "photo_A50C2420_B055_84CF_41BB_A87655C71A77",
 "thumbnailUrl": "media/photo_A50C2420_B055_84CF_41BB_A87655C71A77_t.jpg",
 "width": 494,
 "label": "kendi arak",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A50C2420_B055_84CF_41BB_A87655C71A77.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 660
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A3EE6170_B02D_9F30_415D_B495F865C160_camera"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "photo_A574FA11_B02E_8CF1_4192_4BCCAB142CE6",
 "thumbnailUrl": "media/photo_A574FA11_B02E_8CF1_4192_4BCCAB142CE6_t.jpg",
 "width": 587,
 "label": "prasasti kedukan bukit",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A574FA11_B02E_8CF1_4192_4BCCAB142CE6.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 440
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "photo_A4499F56_B06F_8373_4198_9B2897581F06",
 "thumbnailUrl": "media/photo_A4499F56_B06F_8373_4198_9B2897581F06_t.jpg",
 "width": 587,
 "label": "diorama perang kuto",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A4499F56_B06F_8373_4198_9B2897581F06.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 440
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -96.12,
   "backwardYaw": 89.19,
   "distance": 1,
   "panorama": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 75.27,
   "backwardYaw": -94.35,
   "distance": 1,
   "panorama": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531"
  }
 ],
 "partial": false,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "SAM_100_0109",
 "id": "panorama_A184484A_B053_8D50_41BE_44B25833C778",
 "thumbnailUrl": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_A398E7AE_B072_83D3_41DE_78636E2A7350",
  "this.overlay_A340E701_B06E_84D1_41E2_DE834D364F85",
  "this.overlay_A46A598B_B053_8FD1_41DE_5ECA5932701E"
 ]
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 0, 1)",
   "media": "this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 1, 2)",
   "media": "this.panorama_A184484A_B053_8D50_41BE_44B25833C778",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A546A58F_B056_87D1_41DA_023A1737100E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 2, 3)",
   "media": "this.panorama_A546A58F_B056_87D1_41DA_023A1737100E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 3, 4)",
   "media": "this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 4, 5)",
   "media": "this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 5, 6)",
   "media": "this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist, 6, 0)",
   "media": "this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist"
},
{
 "progressBarBorderColor": "#000000",
 "class": "ViewerArea",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "12.832%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "--- MENU"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "propagateClick": false,
 "data": {
  "name": "-- SETTINGS"
 },
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 115.05,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 641,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_386EC8AA_17CC_0B05_41A6_7EFCA2EDC23B",
  "this.Container_386C28AA_17CC_0B05_41B7_3334E854CA29"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--INFO photoalbum"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_381217E8_17DC_0505_41A2_85B8D0083AEA",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_3811F7E8_17DC_0505_417B_3406AEA143C9"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_2792A64E_17CC_071D_41B0_BEA23997C067",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_2792F64D_17CC_071F_415E_8686768A06D3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_245BFB6E_173C_0D1A_41B3_7C2B11B7D45E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--FLOORPLAN"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_20EC97A3_174C_050A_41B2_EEE2BFFB8076"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_183FA20E_17B1_6AC3_41A6_A5FD4E159AED",
  "this.Container_1830920E_17B1_6AC3_41B2_4E4AC4718E27"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--CONTACT"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "propagateClick": false,
 "class": "Image",
 "id": "image_uidCF48207C_DBFB_D8D3_41A8_4396C14F817B_0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "media/photo_A5D08EFB_B033_8531_41BE_E03C2B6461E0.jpg",
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 0,
 "height": "50%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image6221"
 }
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "htmlText_A5B6D34F_B033_8350_41B4_EC05165F94C0",
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 0,
 "height": "50%",
 "width": "100%",
 "paddingTop": 10,
 "shadow": false,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>Arca Awalokiteswara</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText30013"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "class": "Image",
 "id": "image_uidCF4D307A_DBFB_D8D7_41C1_8DF3500AC6AD_0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "media/photo_A69F7948_B03E_8F50_41E5_E4E123135DFA.jpg",
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 0,
 "height": "50%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image6219"
 }
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "htmlText_A664DE9E_B03E_85F3_41DE_F98844AD3282",
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 0,
 "height": "50%",
 "width": "100%",
 "paddingTop": 10,
 "shadow": false,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>Lambang-lambang Kesultanan Palembang Darussalam</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\">Lambang Kesultanan Palembang Darussalam yang terbuat dari kayu terdapat gambar timbangan, kipas, terompet dan lain-lain</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText31903"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "class": "Image",
 "id": "image_uidCF52C076_DBFB_D8DF_41CC_D812CCD95964_0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "media/photo_A50C2420_B055_84CF_41BB_A87655C71A77.jpg",
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 0,
 "height": "50%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image6217"
 }
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "htmlText_A4FEDA2F_B052_8CD0_41C3_9349BC177215",
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 0,
 "height": "50%",
 "width": "100%",
 "paddingTop": 10,
 "shadow": false,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>Kendi Arak</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\">Kendi yang terbuat dari keramik yang berlambang Burung Hong yang berarti Burung Surga ini berasal dari Cina, tepatnya dari Dinasti Ming pada abad ke 13-14 Masehi, berfungsi untuk minum arak. </SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText20106"
 },
 "scrollBarWidth": 10
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160, this.camera_C91B3150_DBFB_D8D3_41CD_3E5912DB8993); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.54,
   "image": "this.AnimatedImageResource_A8C3BA6C_B033_8D57_41B7_EA984087FBA1",
   "pitch": -32.4,
   "yaw": -6.55,
   "distance": 100
  }
 ],
 "id": "overlay_A55782DF_B036_9D70_41DB_ED0303641EBE",
 "maps": [
  {
   "hfov": 14.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -32.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047, this.camera_C90D815E_DBFB_D8CE_41E9_C6BB07213A05); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.8,
   "image": "this.AnimatedImageResource_A8C30A6C_B033_8D50_41E0_18C9760D759B",
   "pitch": -36.76,
   "yaw": -179.8,
   "distance": 100
  }
 ],
 "id": "overlay_A56B479D_B035_83F0_41E4_AEA28945847D",
 "maps": [
  {
   "hfov": 13.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -36.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A184484A_B053_8D50_41BE_44B25833C778, this.camera_C9237142_DBFB_D836_41E7_E342D6E8F9F1); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02b"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.35,
   "image": "this.AnimatedImageResource_A65B04B9_B072_8531_41E3_C45E52A8C42A",
   "pitch": -9.33,
   "yaw": 89.19,
   "distance": 100
  }
 ],
 "id": "overlay_A2031161_B075_9F50_41E5_0C5FE55E5A09",
 "maps": [
  {
   "hfov": 8.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -9.33
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A4FC9A2F_B052_8CD0_41D1_F091E8C8ADEC, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.44,
   "image": "this.AnimatedImageResource_A8C8AA61_B033_8D51_41C3_419F2C3C507E",
   "pitch": -6.49,
   "yaw": -137.32,
   "distance": 100
  }
 ],
 "id": "overlay_A38712DC_B052_FD70_41E5_C8B641083414",
 "maps": [
  {
   "hfov": 4.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -137.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A546A58F_B056_87D1_41DA_023A1737100E, this.camera_C924B134_DBFB_D852_41E6_01AAF87A8860); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.54,
   "image": "this.AnimatedImageResource_A8CE3A68_B033_8D5F_41E4_CF13E1AED522",
   "pitch": -3.85,
   "yaw": -94.54,
   "distance": 100
  }
 ],
 "id": "overlay_A4736C4C_B055_8557_41DE_B895FCDD9336",
 "maps": [
  {
   "hfov": 5.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99, this.camera_CF1EE0AF_DBFB_D84D_41E1_0E5D991A9109); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.51,
   "image": "this.AnimatedImageResource_A8C21A6C_B033_8D57_41C2_3DAAA9C5E4A0",
   "pitch": -38.31,
   "yaw": -179.8,
   "distance": 100
  }
 ],
 "id": "overlay_A40695B6_B032_8733_41DA_2F253E75CE0A",
 "maps": [
  {
   "hfov": 13.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -38.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531, this.camera_CF11D0BD_DBFB_D852_41BB_4F9B25328F55); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.35,
   "image": "this.AnimatedImageResource_A8C3DA6C_B033_8D57_41E5_292A946F5E1B",
   "pitch": -26.97,
   "yaw": -1.54,
   "distance": 100
  }
 ],
 "id": "overlay_A4D90528_B032_84DF_4195_4E865E7E85B2",
 "maps": [
  {
   "hfov": 15.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99, this.camera_CF0770CA_DBFB_D836_41DE_E40A4BAEFCB8); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.36,
   "image": "this.AnimatedImageResource_A8C4EA6D_B033_8D51_41E2_A41A9F7798FD",
   "pitch": -33.49,
   "yaw": -0.13,
   "distance": 100
  }
 ],
 "id": "overlay_A4C2D3A7_B036_83D1_41DD_B0EC43B8F3F1",
 "maps": [
  {
   "hfov": 14.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.49
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A5B4034E_B033_8350_41B5_BB7D600CB1E3, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.3,
   "image": "this.AnimatedImageResource_A8C4AA72_B033_8D33_41D3_B2147E820FB7",
   "pitch": 5.6,
   "yaw": 171.09,
   "distance": 100
  }
 ],
 "id": "overlay_A560448D_B032_85D0_41D7_1491CF5D77C0",
 "maps": [
  {
   "hfov": 5.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.6
  }
 ]
},
{
 "propagateClick": false,
 "class": "Image",
 "id": "image_uidCF4E407B_DBFB_D8D5_41C7_86F9C055AD1E_0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "media/photo_A574FA11_B02E_8CF1_4192_4BCCAB142CE6.jpg",
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 0,
 "height": "50%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image6220"
 }
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "htmlText_A45DCF06_B02E_84D3_41B0_34DC023F1C32",
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 0,
 "height": "50%",
 "width": "100%",
 "paddingTop": 10,
 "shadow": false,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>Prasasti Kedukan Bukit</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\">Kedukan Bukit adalah nama sebuah kelurahann di kecamatan Ilir Barat II Kota Palembang. Prasasti ini ditemukan oleh Bantenberg pada tanggal 29 oktober 1920 ditepian sungai Tatang ( Desa Kedukan Bukit di kaki Bukit Siguntang). Prasasti ini dipahat pada sebuah batu kali berbentuk bulan dengan garis tengah 80 cm. Prasasti Kedukan Bukit ditulis menggunakan huruf Pallawa dalam bahasa melayu. Isi dari prasasti ini tentang perjalanan Dapunta Hiyang ke Palembang.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24788"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "class": "Image",
 "id": "image_uidCF4C3079_DBFB_D8D5_41E7_48047828A836_0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "media/photo_A4499F56_B06F_8373_4198_9B2897581F06.jpg",
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 0,
 "height": "50%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image6218"
 }
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "htmlText_A37250E3_B06E_9D51_41E4_632783FDCEE2",
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 0,
 "height": "50%",
 "width": "100%",
 "paddingTop": 10,
 "shadow": false,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>Diorama Perang Kuto Gawang 1659</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Times New Roman', Times, serif;\">Diorama ini menggambarkan suasana peperangan antara pasukan VOC melawan Keraton Palembang pada tahun 1659. Tampak di kejauhan Keraton Kuto Gawang yang berada ditepian sungai musi dibakar habis yang menandai kemenangan di pihak VOC. Sementara penguasa Palembang pada waktu itu pangeran Sidoing Rajek berhasil menyelamatkan diri selanjutnya pergi ke pedalaman sampai wafatnya di daerah Saka Tiga kabupaten Ogan Ilir Sumatera Selatan.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18667"
 },
 "scrollBarWidth": 10
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A184484A_B053_8D50_41BE_44B25833C778, this.camera_C931D119_DBFB_D852_41C1_572311B61CAF); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.64,
   "image": "this.AnimatedImageResource_A8C16A6B_B033_8D51_41D7_994E0A2765B9",
   "pitch": -7.77,
   "yaw": -94.35,
   "distance": 100
  }
 ],
 "id": "overlay_A388F417_B02E_84F1_41E5_E1ECCB9790CE",
 "maps": [
  {
   "hfov": 18.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.77
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A45E0F06_B02E_84D3_41D9_034DB5D4C259, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.15,
   "image": "this.AnimatedImageResource_A8C12A6B_B033_8D51_41BE_7D723F84CFB2",
   "pitch": -18,
   "yaw": 83.98,
   "distance": 100
  }
 ],
 "id": "overlay_A411C962_B02E_8F53_41C0_1ACECF4CD008",
 "maps": [
  {
   "hfov": 5.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 83.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3EE6170_B02D_9F30_415D_B495F865C160, this.camera_C936D10B_DBFB_D836_41AD_141C46244F03); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.36,
   "image": "this.AnimatedImageResource_A8C2BA6C_B033_8D57_41D0_E948923AA7B2",
   "pitch": -26.87,
   "yaw": -179.81,
   "distance": 100
  }
 ],
 "id": "overlay_A407892E_B033_8CD3_41DE_74672FF0A68B",
 "maps": [
  {
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -26.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1, this.camera_C92E4126_DBFB_D87E_41E5_8D2B3471E3FF); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.16,
   "image": "this.AnimatedImageResource_A8C0BA6A_B033_8D53_41C4_AC899584A3CC",
   "pitch": -5.61,
   "yaw": 90.27,
   "distance": 100
  }
 ],
 "id": "overlay_A42865FA_B055_8730_41E4_1AF47448B262",
 "maps": [
  {
   "hfov": 6.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.61
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A6676E9E_B03E_85F3_41E4_948B7B6055DD, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.86,
   "image": "this.AnimatedImageResource_A8C06A6A_B033_8D53_41E0_C608CAD71BC5",
   "pitch": 24.02,
   "yaw": 2.65,
   "distance": 100
  }
 ],
 "id": "overlay_A6FDC9A3_B03D_8FD0_41B9_9A4CE64ED265",
 "maps": [
  {
   "hfov": 4.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 24.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.25,
   "image": "this.AnimatedImageResource_A8C19A6B_B033_8D51_41C0_49CBDADDFB62",
   "pitch": -2.99,
   "yaw": -150.88,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A59BB950_B03D_8F70_41D6_2349278A7A33",
 "data": {
  "label": "Circle Arrow 03"
 },
 "maps": [
  {
   "hfov": 9.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.99
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 37,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "paddingRight": 0,
 "right": 30,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 49,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "bottom": 8,
 "minWidth": 1,
 "mode": "push",
 "height": 37,
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 49,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1, this.camera_CF31E093_DBFB_D855_41AA_BAA53B06C64D); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Circle Arrow 02b"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.32,
   "image": "this.AnimatedImageResource_A65A04B9_B072_8531_41C4_F0C1B875CDC1",
   "pitch": -10.56,
   "yaw": -96.12,
   "distance": 100
  }
 ],
 "id": "overlay_A398E7AE_B072_83D3_41DE_78636E2A7350",
 "maps": [
  {
   "hfov": 8.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -10.56
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A37420E2_B06E_9D53_41CE_5EBCFB7E893A, null, false)"
  }
 ],
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.29,
   "image": "this.AnimatedImageResource_A8CFBA69_B033_8D51_41E5_CFC40E05BB91",
   "pitch": -6.85,
   "yaw": -169.1,
   "distance": 100
  }
 ],
 "id": "overlay_A340E701_B06E_84D1_41E2_DE834D364F85",
 "maps": [
  {
   "hfov": 5.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531, this.camera_CF2A90A1_DBFB_D875_41D6_4BC5C09A5DE3); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.22,
   "image": "this.AnimatedImageResource_A8C0DA6A_B033_8D53_41E1_2BE5446989EA",
   "pitch": -5.47,
   "yaw": 75.27,
   "distance": 100
  }
 ],
 "id": "overlay_A46A598B_B053_8FD1_41DE_5ECA5932701E",
 "maps": [
  {
   "hfov": 9.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.47
  }
 ]
},
{
 "maxHeight": 2,
 "propagateClick": false,
 "class": "Image",
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "left": "0%",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "bottom": 53,
 "minWidth": 1,
 "height": 2,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "data": {
  "name": "white line"
 },
 "maxWidth": 3000
},
{
 "propagateClick": false,
 "data": {
  "name": "-button set container"
 },
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 30,
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
  "this.Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
  "this.Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
  "this.Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
  "this.Button_33E0F47E_11C1_A20D_419F_BB809AD89259"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": 51,
 "gap": 3,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "propagateClick": false,
 "data": {
  "name": "button menu sup"
 },
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 110,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "horizontal"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "85.959%",
 "width": "91.304%",
 "gap": 3,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll",
 "layout": "vertical"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386EC8AA_17CC_0B05_41A6_7EFCA2EDC23B",
 "left": "10%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "10%",
 "children": [
  "this.Container_386D38AA_17CC_0B05_4199_8338E0FE7991",
  "this.Container_386DA8AA_17CC_0B05_41A8_EBE6620047C3"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "5%",
 "scrollBarOpacity": 0.5,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "horizontal",
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386C28AA_17CC_0B05_41B7_3334E854CA29",
 "left": "10%",
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "right": "10%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "scrollBarOpacity": 0.5,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "layout": "vertical"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_3811F7E8_17DC_0505_417B_3406AEA143C9",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_3811E7E8_17DC_0505_4189_A53F22044B22",
  "this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "vertical",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_2792F64D_17CC_071F_415E_8686768A06D3",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_2792E64D_17CC_071F_41B6_648718DBC7B5",
  "this.WebFrame_245FE213_17C4_1F0B_41A4_D9A473C556C8"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 4,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "vertical",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_245BFB6E_173C_0D1A_41B3_7C2B11B7D45E",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_245BCB6E_173C_0D1A_419A_5D9B9177800A",
  "this.MapViewer"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 4,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "vertical",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_20EC97A3_174C_050A_41B2_EEE2BFFB8076",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_20EC87A3_174C_050A_4198_F9830A58FD09",
  "this.Container_2F7D65D9_1744_0506_41B3_4FD17B01B645"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 6,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "vertical",
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_183FA20E_17B1_6AC3_41A6_A5FD4E159AED",
 "left": "10%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "right": "10%",
 "children": [
  "this.Container_183F920E_17B1_6AC3_4174_65DF01CAE26A",
  "this.Container_1830320E_17B1_6AC3_41B6_E59ACE72BE82"
 ],
 "shadowColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "5%",
 "scrollBarOpacity": 0.5,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "horizontal",
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1830920E_17B1_6AC3_41B2_4E4AC4718E27",
 "left": "10%",
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "right": "10%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "scrollBarOpacity": 0.5,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "layout": "vertical"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C3BA6C_B033_8D57_41B7_EA984087FBA1",
 "levels": [
  {
   "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C30A6C_B033_8D50_41E0_18C9760D759B",
 "levels": [
  {
   "url": "media/panorama_A3EE2DF1_B02D_8731_41CC_F62D136D2A99_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A65B04B9_B072_8531_41E3_C45E52A8C42A",
 "levels": [
  {
   "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 720
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C8AA61_B033_8D51_41C3_419F2C3C507E",
 "levels": [
  {
   "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8CE3A68_B033_8D5F_41E4_CF13E1AED522",
 "levels": [
  {
   "url": "media/panorama_A31F3511_B053_84F0_41C6_40CFE6868FC1_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C21A6C_B033_8D57_41C2_3DAAA9C5E4A0",
 "levels": [
  {
   "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C3DA6C_B033_8D57_41E5_292A946F5E1B",
 "levels": [
  {
   "url": "media/panorama_A3EE6170_B02D_9F30_415D_B495F865C160_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C4EA6D_B033_8D51_41E2_A41A9F7798FD",
 "levels": [
  {
   "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C4AA72_B033_8D33_41D3_B2147E820FB7",
 "levels": [
  {
   "url": "media/panorama_A3EDA947_B02D_8F51_41D3_AFB0D5A75047_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C16A6B_B033_8D51_41D7_994E0A2765B9",
 "levels": [
  {
   "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C12A6B_B033_8D51_41BE_7D723F84CFB2",
 "levels": [
  {
   "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C2BA6C_B033_8D57_41D0_E948923AA7B2",
 "levels": [
  {
   "url": "media/panorama_A5501E95_B02D_85F0_41C7_8D03B5ACF531_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C0BA6A_B033_8D53_41C4_AC899584A3CC",
 "levels": [
  {
   "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C06A6A_B033_8D53_41E0_C608CAD71BC5",
 "levels": [
  {
   "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C19A6B_B033_8D51_41C0_49CBDADDFB62",
 "levels": [
  {
   "url": "media/panorama_A546A58F_B056_87D1_41DA_023A1737100E_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A65A04B9_B072_8531_41C4_F0C1B875CDC1",
 "levels": [
  {
   "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 720
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8CFBA69_B033_8D51_41E5_CFC40E05BB91",
 "levels": [
  {
   "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 460,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_A8C0DA6A_B033_8D53_41E1_2BE5446989EA",
 "levels": [
  {
   "url": "media/panorama_A184484A_B053_8D50_41BE_44B25833C778_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Lobby"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 120,
 "iconHeight": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "Lobby",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.openLink('https://gungeee.github.io/vt_smb/tour.htm', '_self')",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Sriwijaya"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 140,
 "iconHeight": 32,
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "Sriwijaya",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.openLink('https://gungeee.github.io/vt_smb/sriwijaya/tour.htm', '_self')",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Kolonial"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 100,
 "iconHeight": 32,
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "Kolonial",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, true, 0, null, null, false)",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Kesultanan"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 113,
 "iconHeight": 32,
 "minHeight": 1,
 "rollOverFontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "Kesultanan",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, true, 0, null, null, false)",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Daur Hidup"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 122,
 "iconHeight": 32,
 "minHeight": 1,
 "rollOverFontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "Daur Hidup",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, true, 0, null, null, false)",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_33E0F47E_11C1_A20D_419F_BB809AD89259",
 "rollOverBackgroundColor": [
  "#FF361B"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button contact"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 100,
 "iconHeight": 32,
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "label": "CONTACT",
 "height": 40,
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, true, 0, null, null, false)",
 "fontStyle": "italic",
 "backgroundOpacity": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 60,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "height": 60,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.shareTwitter(window.location.href)",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.shareFacebook(window.location.href)",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386D38AA_17CC_0B05_4199_8338E0FE7991",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF",
  "this.Container_386D68AA_17CC_0B05_41B3_8E850505A16B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "width": "85%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386DA8AA_17CC_0B05_41A8_EBE6620047C3",
 "propagateClick": false,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "children": [
  "this.Container_386D98AA_17CC_0B05_41AE_A3E113DCCC00",
  "this.Container_386D88AA_17CC_0B05_41B1_9A2C832D4E62",
  "this.Container_386DC8AA_17CC_0B05_418D_1F78D6A291FF"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.51,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "50%",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "layout": "vertical"
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 40,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0.jpg",
 "mode": "push",
 "minWidth": 40,
 "click": "this.setComponentVisibility(this.Container_386C68AA_17CC_0B05_4191_7DAFDF1C1A4B, false, 0, null, null, false)",
 "height": "75%",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_386C18AA_17CC_0B05_4198_1FCD97F770C0_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_3811E7E8_17DC_0505_4189_A53F22044B22",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_3811C7E8_17DC_0505_4199_1B551680AC34",
  "this.IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FF361B"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "height": 80,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "scrollBarWidth": 10,
 "class": "ThumbnailGrid",
 "id": "ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#FF361B",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "paddingLeft": 70,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#FF361B",
 "scrollBarOpacity": 0.5,
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "rollOverItemLabelFontSize": 16,
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minWidth": 1,
 "itemPaddingLeft": 3,
 "itemLabelFontFamily": "Oswald Regular",
 "selectedItemLabelFontColor": "#C1280E",
 "itemLabelPosition": "bottom",
 "height": "100%",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "itemMinHeight": 50,
 "borderSize": 0,
 "selectedItemLabelFontSize": 16,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#C1280E",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_381227E8_17DC_0505_41AB_9B42B2CC193B_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 16,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 160,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 30,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemLabelGap": 7,
 "itemThumbnailWidth": 220
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_2792E64D_17CC_071F_41B6_648718DBC7B5",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_2792D64D_17CC_071F_4198_A70438B191B7",
  "this.IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FF361B"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "height": 80,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0
 ],
 "class": "WebFrame",
 "id": "WebFrame_245FE213_17C4_1F0B_41A4_D9A473C556C8",
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14376.151861634273!2d-73.99351941263586!3d40.75732561349075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1ses!2ses!4v1542287427714\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "width": "100%",
 "minWidth": 1,
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "WebFrame52781"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_245BCB6E_173C_0D1A_419A_5D9B9177800A",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_245BDB6E_173C_0D1A_41AA_78BDF4EE53FF",
  "this.IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FF361B"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "height": 80,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "progressBarBorderColor": "#000000",
 "class": "ViewerArea",
 "id": "MapViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Floor Plan"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_20EC87A3_174C_050A_4198_F9830A58FD09",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_20ECF7A3_174C_050A_41A5_0B8AD2C6B179",
  "this.IconButton_20ECE7A3_174C_050A_41B4_AF609035102C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FF361B"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "height": 80,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_2F7D65D9_1744_0506_41B3_4FD17B01B645",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE",
  "this.Container_2F7D05DA_1744_0505_41A1_C7BCABBECBE0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-photoalbum"
 },
 "overflow": "visible",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_183F920E_17B1_6AC3_4174_65DF01CAE26A",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.Image_182FD4E7_17B7_EF41_41AA_D495544C1972"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "width": "85%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1830320E_17B1_6AC3_41B6_E59ACE72BE82",
 "propagateClick": false,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "children": [
  "this.Container_1830220E_17B1_6AC3_4178_5E7AD867CE60",
  "this.Container_1830020E_17B1_6AC3_4194_70380D44B9C6",
  "this.Container_1830A20E_17B1_6AC3_41B1_7B5CC3A88353"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.51,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "50%",
 "gap": 0,
 "height": "100%",
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "layout": "vertical"
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 40,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6.jpg",
 "mode": "push",
 "minWidth": 40,
 "click": "this.setComponentVisibility(this.Container_1831720E_17B1_6AC3_41B2_FDD66A00A2E5, false, 0, null, null, false)",
 "height": "75%",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1830820E_17B1_6AC3_41A7_A2550D4CD4B6_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "progressBarBorderColor": "#000000",
 "class": "ViewerArea",
 "id": "ViewerAreaLabeled_386D08AA_17CC_0B05_41A7_5EF26F48CDAF",
 "left": 0,
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "right": 0,
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipFontSize": 12,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "bottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Viewer info 1"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386D68AA_17CC_0B05_41B3_8E850505A16B",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "children": [
  "this.IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
  "this.Container_386D48AA_17CC_0B05_41AC_EB6F45FE66D5",
  "this.IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "100%",
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container arrows"
 },
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386D98AA_17CC_0B05_41AE_A3E113DCCC00",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "right",
 "width": "100%",
 "gap": 0,
 "height": 60,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386D88AA_17CC_0B05_41B1_9A2C832D4E62",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_386DF8AA_17CC_0B05_41AE_D7BDB2970D08",
  "this.Button_386DE8AA_17CC_0B05_41B5_DE879E1001C4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.79,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "layout": "vertical"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_386DC8AA_17CC_0B05_418D_1F78D6A291FF",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "width": 370,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "backgroundOpacity": 0.3,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "id": "HTMLText_3811C7E8_17DC_0505_4199_1B551680AC34",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 80,
 "width": "77.115%",
 "paddingTop": 17,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.66vh;font-family:'Oswald';\"><B>PANORAMA LIST/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E",
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 50,
 "minHeight": 40,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E.jpg",
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_381217E8_17DC_0505_41A2_85B8D0083AEA, false, 0, null, null, false)",
 "height": 50,
 "top": 15,
 "rollOverIconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E_rollover.jpg",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_381237E8_17DC_0505_41B6_D4CE0AA1A79E_pressed.jpg",
 "cursor": "hand",
 "maxWidth": 50,
 "data": {
  "name": "X"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "id": "HTMLText_2792D64D_17CC_071F_4198_A70438B191B7",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 80,
 "width": "77.115%",
 "paddingTop": 17,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.66vh;font-family:'Oswald';\"><B>LOCATION/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14",
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 70,
 "minHeight": 40,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14.jpg",
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2792A64E_17CC_071D_41B0_BEA23997C067, false, 0, null, null, false)",
 "height": 70,
 "top": 15,
 "rollOverIconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14_rollover.jpg",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2792C64E_17CC_071D_41A6_23C9E23D2F14_pressed.jpg",
 "cursor": "hand",
 "maxWidth": 50,
 "data": {
  "name": "X"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "id": "HTMLText_245BDB6E_173C_0D1A_41AA_78BDF4EE53FF",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 80,
 "width": "77.115%",
 "paddingTop": 17,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.66vh;font-family:'Oswald';\"><B>FLOORPLAN/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14",
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 70,
 "minHeight": 40,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14.jpg",
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_24580B6E_173C_0D1A_41B0_1B17CFD194C1, false, 0, null, null, false)",
 "height": 70,
 "top": 15,
 "rollOverIconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14_rollover.jpg",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24582B6E_173C_0D1A_41AB_C451C6520A14_pressed.jpg",
 "cursor": "hand",
 "maxWidth": 50,
 "data": {
  "name": "X"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "id": "HTMLText_20ECF7A3_174C_050A_41A5_0B8AD2C6B179",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 80,
 "width": "77.115%",
 "paddingTop": 17,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:3.66vh;font-family:'Oswald';\"><B>PHOTOALBUM/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 50,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_20ECE7A3_174C_050A_41B4_AF609035102C",
 "paddingRight": 0,
 "right": 15,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 50,
 "minHeight": 40,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C.jpg",
 "minWidth": 40,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_20ECC7A3_174C_050A_41B2_47EE9CF02D5F, false, 0, null, null, false)",
 "height": 50,
 "top": 15,
 "rollOverIconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C_rollover.jpg",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20ECE7A3_174C_050A_41B4_AF609035102C_pressed.jpg",
 "cursor": "hand",
 "maxWidth": 50,
 "data": {
  "name": "X"
 }
},
{
 "progressBarBorderColor": "#000000",
 "class": "ViewerArea",
 "id": "ViewerAreaLabeled_2F7D75D9_1744_0506_41B5_EA00300636BE",
 "left": 0,
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "right": 0,
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipFontSize": 12,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "bottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_2F7D05DA_1744_0505_41A1_C7BCABBECBE0",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "children": [
  "this.IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F",
  "this.Container_2F7EC5DA_1744_0505_415B_75BFEE966C4E",
  "this.IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "100%",
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container arrows"
 },
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "maxHeight": 894,
 "propagateClick": false,
 "class": "Image",
 "id": "Image_182FD4E7_17B7_EF41_41AA_D495544C1972",
 "left": "0%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_182FD4E7_17B7_EF41_41AA_D495544C1972.jpg",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "data": {
  "name": "Image5820"
 },
 "maxWidth": 1341
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1830220E_17B1_6AC3_4178_5E7AD867CE60",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "right",
 "width": "100%",
 "gap": 0,
 "height": 50,
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1830020E_17B1_6AC3_4194_70380D44B9C6",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_1830E20E_17B1_6AC3_419B_A422A7600CB2",
  "this.Image_16B75461_1B87_4970_41B9_4F94F65FB1C1",
  "this.Button_1830D20E_17B1_6AC3_4198_688BED36E073"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.79,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "gap": 25,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "-Container text"
 },
 "overflow": "scroll",
 "layout": "vertical"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarWidth": 10,
 "class": "Container",
 "id": "Container_1830A20E_17B1_6AC3_41B1_7B5CC3A88353",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "width": 370,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "backgroundOpacity": 0.3,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "transparencyActive": true,
 "maxHeight": 130,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 70,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D.png",
 "mode": "push",
 "minWidth": 70,
 "height": "8%",
 "width": "8%",
 "rollOverIconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_386D58AA_17CC_0B05_41B4_E6FBE56E944D_pressed.png",
 "data": {
  "name": "IconButton left arrow"
 },
 "cursor": "hand",
 "maxWidth": 130
},
{
 "propagateClick": false,
 "class": "Container",
 "id": "Container_386D48AA_17CC_0B05_41AC_EB6F45FE66D5",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "30%",
 "width": "84%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "layout": "absolute"
},
{
 "transparencyActive": true,
 "maxHeight": 130,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 70,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6.png",
 "mode": "push",
 "minWidth": 70,
 "height": "8%",
 "width": "8%",
 "rollOverIconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_386DB8AA_17CC_0B05_41B0_6B5C848304F6_pressed.png",
 "data": {
  "name": "IconButton right arrow"
 },
 "cursor": "hand",
 "maxWidth": 130
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "HTMLText_386DF8AA_17CC_0B05_41AE_D7BDB2970D08",
 "scrollBarColor": "#FF361B",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:8.41vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.85vh;font-family:'Oswald';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.56vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:2.56vh;font-family:'Oswald Regular';\">Dolor sit amet, consectetur adipiscing elit. Nunc porttitor ac nulla vitae bibendum.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.65vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.65vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.65vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.65vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.65vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_386DE8AA_17CC_0B05_41B5_DE879E1001C4",
 "rollOverBackgroundColor": [
  "#C1280E"
 ],
 "propagateClick": false,
 "paddingLeft": 0,
 "data": {
  "name": "Button31015"
 },
 "paddingRight": 0,
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "width": 207,
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 59,
 "mode": "push",
 "minWidth": 1,
 "fontSize": "3.7vh",
 "label": "lorem ipsum",
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "backgroundColor": [
  "#FF361B"
 ],
 "paddingTop": 0,
 "fontStyle": "normal",
 "backgroundOpacity": 1,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 70,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F.png",
 "mode": "push",
 "minWidth": 70,
 "height": "10%",
 "width": "10%",
 "rollOverIconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F7D35DA_1744_0505_41AF_6A4BEFADCE2F_pressed.png",
 "data": {
  "name": "IconButton left arrow"
 },
 "cursor": "hand",
 "maxWidth": 150
},
{
 "propagateClick": false,
 "class": "Container",
 "id": "Container_2F7EC5DA_1744_0505_415B_75BFEE966C4E",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "30%",
 "width": "80%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "layout": "absolute"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "class": "IconButton",
 "id": "IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 70,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33.png",
 "mode": "push",
 "minWidth": 70,
 "height": "10%",
 "width": "10%",
 "rollOverIconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33_rollover.png",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F7ED5DA_1744_0505_41B5_30F6E0D44E33_pressed.png",
 "data": {
  "name": "IconButton right arrow"
 },
 "cursor": "hand",
 "maxWidth": 150
},
{
 "propagateClick": false,
 "class": "HTMLText",
 "id": "HTMLText_1830E20E_17B1_6AC3_419B_A422A7600CB2",
 "scrollBarColor": "#FF361B",
 "paddingRight": 10,
 "paddingLeft": 10,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "62.894%",
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 3,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:4.94vh;font-family:'Oswald';\"><B>______</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.85vh;font-family:'Oswald';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.56vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff361b;font-size:2.56vh;font-family:'Oswald Regular';\"><B>Dolor sit amet, consectetur adipiscing elit. Nunc porttitor ac nulla vitae.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.83vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.1vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.83vh;font-family:'Oswald';\"><B>www.loremipsum.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.83vh;font-family:'Oswald';\"><B>info@loremipsum.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.83vh;font-family:'Oswald';\"><B>Tlf.: +11 111 111 111</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.83vh;font-family:'Oswald';\"><B>Address line 1</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.83vh;font-family:'Oswald';\"><B>Address line 2</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "maxHeight": 120,
 "propagateClick": false,
 "class": "Image",
 "id": "Image_16B75461_1B87_4970_41B9_4F94F65FB1C1",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_16B75461_1B87_4970_41B9_4F94F65FB1C1.jpg",
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "70%",
 "minWidth": 1,
 "height": "30%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image logo"
 },
 "maxWidth": 211
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "class": "Button",
 "id": "Button_1830D20E_17B1_6AC3_4198_688BED36E073",
 "rollOverBackgroundColor": [
  "#C1280E"
 ],
 "propagateClick": false,
 "paddingLeft": 0,
 "data": {
  "name": "Button Contact"
 },
 "paddingRight": 0,
 "fontFamily": "Oswald Regular",
 "fontColor": "#FFFFFF",
 "width": 140,
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 59,
 "mode": "push",
 "minWidth": 1,
 "fontSize": "2.83vh",
 "label": "CONTACT",
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "backgroundColor": [
  "#FF361B"
 ],
 "paddingTop": 0,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "fontStyle": "normal",
 "backgroundOpacity": 1,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
}],
 "width": "100%",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
