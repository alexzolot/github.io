
function round(x, n){return Math.round(x*n)/n || x}
function r100(x) {return round(x, 100)};
function v100(x) {return r100($(x).val())};

var fJ= JSON.parse, tJ= JSON.stringify;
//String.prototype.fJ= function() {return JSON.parse(this)} 
//Object.prototype.tJ= function() {return JSON.stringify(this)} 
Array.prototype.notEmpty= function() {return this.filter(function(s){return s>''})}

// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.sf0= function() {  //format 
    var newStr = this, i = 0;
    while (/%s/.test(newStr)) newStr = newStr.replace("%s", arguments[i++])
    return newStr;
}

String.prototype.sf0= function() {  //format 
   var th = this;
   var _r=function(p, s){return p.replace(/%s/, s);}
    return arguments.reduce(_r, th);
}
// 'a %s b %s'.sf(1, 'zz')


String.prototype.sf = function() {  //format 
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace(/%s/, arguments[arg]);
    }
    return formatted;
};


// $.ajaxSetup({ cache: false }); //?? need it?


//<template id="note-template">
//	<div class="col-md-3 vid">
//	   {{header}}:<br/><textarea id="{{id}}"  rows="3" cols="45"></textarea>
//	</div>
//</template> 
//
//<note header="" id=""></>


Vue.component('note',{
    template: '#note-template',
    props: {header:{type: String, required: true}, id:{type: String, required: true}}
    })
	
Vue.component('vplayercontrols',{
    template: '#vPlayerControls-template',
    props: {ip: {
            type: String,
            required: true
        }}
	, methods: {
//		mounted: function(){$('.vpcontr').draggable()}
	}
	
    })
	
Vue.component('vplayer',{
    template: '#vPlayer-template',
    props: {ip: {
            type: String,
            required: true
        }
	, data: {
	    name: 'Vue.js'
	  }
    }

	, methods: {
	clkB : function (event) {var ip= this.ip
		     
		      pp[ip]=   new YT.Player('v' + ip, {
		      width: '100%', height: "100%",
		      //playerVars: {'autoplay': 0, playlist: plt[ip].join()}, //'urAXN77X6zU'}, // 'M7lc1UVf-VE,taJ60kskkns,FG0fTKAqZ5g'
		      playerVars: {'autoplay': 0, playlist: []}, //'urAXN77X6zU'}, // 'M7lc1UVf-VE,taJ60kskkns,FG0fTKAqZ5g'
		      events: {
		       'onReady': onplaReady(ip), //onpla1Ready,
		       'onStateChange': onplaStateChange(ip) //onpla1StateChange
		      }
		     
		   });
	  } 
	} 
});





    // 3. This function creates an <iframe> (and YouTube pp[1])
    //    after the API code downloads.
    var time_update_interval, t1=0, t2=0, pp= {}; // pp - players
    
    
    function YT_Players________________________________________________________() {}

    function plays(pla, speed) {
		    	if(pla.getPlayerState()==YT.PlayerState.PLAYING) {
		    		pla.pauseVideo()
		    	} else {pla.setPlaybackRate(speed).playVideo(); clearCanv()
	    	}};
    
    pshift= function(pla, dt, el) {pla.pauseVideo(); t=pla.getCurrentTime()+ dt; pla.seekTo(t); $(el).val(r100(t))}
    
    function onYouTubeIframeAPIReady() { // az debug hands-T
    	YTpp= YT.Player.prototype
    	
    	YTpp.go1Vid= function(vidId, t){ console.log('prototype.go1Vid: vidId,  t=' +vidId,  t); 
          var pla= this;
			 //var iOld= pla.getPlaylistIndex(), pll= pla.getPlaylist(), iNew=0;
             if(!pla.getPlaylist) return;
          
			 var pll= pla.getPlaylist()  // ,iOld= pla.getPlaylistIndex(),  iNew=0;
//			 for(iNew=0, l=pll.length; iNew<l; iNew++){if(pll[iNew]==vidId){break}}
//			 var d= iNew - iOld;

//			 if(d>0){for(var i=0; i <  d; i++){ pla= pla.nextVideo()     }}
//			 if(d<0){for(var i=0; i < -d; i++){ pla= pla.previousVideo() }}
//			 pla.seekTo(t);  
//			 setTimeout(function(){pla.pauseVideo().seekTo(t);}, 2000); 
			 
			// iNew= pll.indexOf(vidId)
			 if(pll){
				 pla= pla.playVideoAt( pll.indexOf(vidId) ).seekTo(t- .3) //.pauseVideo()
	             setTimeout(function(){pla.pauseVideo().seekTo(t);}, 2000);
							 //if (pla.getState() == YT.PlayerState.PLAYING) setTimeout(function(){pla.pauseVideo()}, 1000);  
				 
				 
	//			 var timer= setInterval(function() {pla.pauseVideo().seekTo(t);
	//			   if(player.getPlayerState()==YT.PlayerState.PAUSED) clearInterval(timer)
	//			 }, 1000);
				 
				
				// nOK ? 
	//			 function seek(){
	//				 if(pla.getPlayerState()!=YT.PlayerState.PAUSED){
	//					 pla.pauseVideo().seekTo(t) //; 
	//				     setTimeout(seek, 1000)}
	//			 }
	//			 seek()
				 
				 //while(player.getPlayerState()==YT.PlayerState.PLAYING)
				 
				 
				 // $('#t' + ip).val(r100(t))
	
				 return pla;	 
			 }
			 

      }
    	
        
    	YTpp.loadNpause= function(vidId, t){var p=this, currV=p.getVideoData().video_id;
    // 	   if(null !=currV) {if(currV != vidId){
     		   this.loadVideoById({videoId:vidId, suggestedQuality: 'large'}); 
     		   this.mute(); setTimeout(function(){p.goPause(t)}, 1000)
    // 	   }} else {p.goPause(t)}
     	} /// pp[2].loadNpause("5SZqiCggJN8", 8.88); pp[2].loadNpause("SgrO7Dprl6g", 11.11)
        

    	YTpp.goPause= function(t){ 
     	   return this.mute().playVideo().seekTo(t).pauseVideo().seekTo(t) 
   	   } /// var p= pp[1];  p.goPause(3); p.getPlayerState(); YT.PlayerState

        // 	  return function(){pla.mute();  pla.playVideo(); pla.seekTo(t); pla.pauseVideo(); pla.seekTo(t)}} // pla.playVideo();

    	YTpp.getIndex=  function(){return this.getIframe().id.substr(1)
        }  /// var p= pp[1];  var p= pp[2]; p.getIndex()    	
    	
    	initYTP=  function(ip){ return new YT.Player('v' + ip, {
		            width: '100%', height: "100%",
		           // playerVars: {'autoplay': 0, playlist: plt[ip].join()}, // origin: 'null' ??
		            playerVars: {'autoplay': 0, playlist: []}, // origin: 'null' ??
		            events: {
		             'onReady': onplaReady(ip), 
		             'onStateChange': onplaStateChange(ip) 
		            }
		         });
    	}

      pp[1]= initYTP(1)
      pp[2]= initYTP(2)

    }
    
    
    function onplaReady(i){ return function(event) {var pla= event.target;  //, i= pla.a.id.substr(1); // i  in 1:2
    	pla.setPlaybackQuality('medium');
    	pla.mute();
    	go2ev(0); 

        // Clear any old interval.
        if (time_update_interval != undefined) clearInterval(time_update_interval);

        // Start interval to update elapsed time display every second.
        time_update_interval = setInterval(updateTimerDisplay, 1000)
    }}


   	// Update current time text display.
    function updateTimerDisplay(){
   	     if(pp[1].getCurrentTime) $('#t1').val(r100( pp[1].getCurrentTime() ));
	     if(pp[2].getCurrentTime) $('#t2').val(r100( pp[2].getCurrentTime() ));
     }
      

  function onplaStateChange(i){ return function(event) { 
    	  if (event.data == YT.PlayerState.PAUSED){updateTimerDisplay()
  	  }}
  }

  function formatTime(time){
      time = Math.round(time);

      var minutes = Math.floor(time / 60),
      seconds = time - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ":" + seconds;
  }

   function fillPlaylistsDict(){  /// fillPlaylistsDict(daPL)
	     playlistsDict={}; playlistsDictY={}; plt= {1:[], 2:[]};
	     for(var i=0, l= daPL.length; i<l; i++){ var p= daPL[i], pt=p.Type;
		  	//if(p.Type>0) plt[p.Type].push(p.YTId); playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
		  	if(pt==1 || pt==3) if(plt[1].indexOf(p.YTId) < 0) plt[1].push(p.YTId); 
		  	if(pt==2 || pt==3) if(plt[2].indexOf(p.YTId) < 0) plt[2].push(p.YTId); 
		  	playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
		 }
	     return plt
   }
   


  


//function fullScreen(ip){
//	   $('#vp' + ip + ' iframe').detach().appendTo('body').css({position: 'absolute','top':0,'left':0, 'width': '100%','height':'100%','z-index':'120'});
//	   $('#vpcontr' + ip).detach().appendTo('body').css({position: 'absolute','top':0,'left':'30%', 'width': '30%','height':'50px','z-index':'140'});
//};
  
  //var scrcss= getComputedStyle($('#vp1 iframe')[0]), wi= scrcss.width, he= wi.replace('px','') * 9/16;

   
  function fullScreen(ip){
	  var wi= $('#vp1').width(), he= wi * 9/16;  console.log('fullScreen() ip=', ip, "  wi,he=", wi, he)
	  console.log("$('#fullscr'+ip).text()=", $('#fullscr'+ip).text())
	  
	  var p= pp[ip];
 	  console.log("fullScreen: p=", p)

	  var state= {i: p.getPlaylistIndex(), t: p.getCurrentTime(), PL: p.getPlaylist()}  

      // var vp= $('#vp' + ip + ' iframe')
      var vp= $('#v' + ip)
 	  console.log("wi=", wi)
 	  console.log("vp.width()=", vp.width())
	  
	  if($('#fullscr'+ ip)[0].classList.value.indexOf("glyphicon-fullscreen")>=0){  //if($('#fullscr'+ip).text()=='FS'){
		   vp.appendTo('body')  // .detach()
                 .css({position: 'absolute'
			           , top: $(document).scrollTop()
			           , left: 0, width: '100%', height:'100%','z-index':'120'});
		   $('#vpcontr' + ip ).appendTo('body').css({position: 'absolute'
			      , top: vp.offset().top + vp.height() - 35  //'96%' // $('body iframe').height()	
			      , left: '30%'
			      , width: '30%', height:'50px','z-index':'99999'});
			 
 
		   $('#canvas').appendTo('body').css({position: 'absolute' //, border:'1px solid #ccffcc'
			      , top: vp.offset().top +  35  //'96%' // $('body iframe').height()	
			      , left: '40px'
	            , Width: '90%', Height: document.body.clientHeight, 'z-index':'99999'});

		        ctx.canvas.height = window.innerHeight * .82 
			
				canvasOffset = $("#canvas").offset();
				offsetX = canvasOffset.left;
				offsetY = canvasOffset.top;
			   
		   $('#canv-tools').appendTo('body').css({position: 'absolute'
		      , top: vp.offset().top + vp.height() - 35  //'96%' // $('body iframe').height()	
		      , left: '60%'
		      , width: '30%', height:'50px','z-index':'99999'});

		   $('#fullscr'+ip).toggleClass('glyphicon-fullscreen  glyphicon-resize-small') //$('#fullscr'+ip).text('fs')
	  } else{
			   var vp= $('body > iframe').appendTo($('#vp' + ip)).css({top:0
				   , left:0, width: wi, height: he, 'z-index': 8});
			   $('#vpcontr' + ip ).appendTo($('#vpcontr-contain' + ip)).css({position: 'absolute'
				    , top: 0, left:0, width: '100%', height:'50px'
					});
			   
			   $('#canvas').appendTo('#divcanvas')
			   		        ctx.canvas.width= $("#vplayers").width()-8 
			   		        ctx.canvas.height= $("#vplayers").height() -100 

			   positionCanvas()
			   
			 //  $('#canv-tools').insertBefore($('#bt-draw')).css({position: 'relative'
				   $('#canv-tools').insertAfter($('#both')).css({position: 'relative'
				      , top: 0, left:'20px'})  //'96%' // $('body iframe').height()
					      
//				      , width: '100px', height:'50px','z-index':'99999'});
				      
//			  // $('#canv-tools').appendTo($('#both')).css({position: 'relative'
//			  .css({position: 'relative'
//				      , top: 0  //'96%' // $('body iframe').height()	
//				      , left: '60%'
//				      , width: '100px', height:'50px','z-index':'99999'});
			   
			   $('#fullscr'+ip).toggleClass('glyphicon-resize-small glyphicon-fullscreen') //$('#fullscr'+ip).text('FS')
		}
	  
 	 setTimeout(function(){	
 		   p.loadPlaylist(state.PL)
		   p.playVideoAt(state.i).seekTo(state.t)
		   setTimeout(function(){p.seekTo(state.t)}, 2000)	 
	 }, 1000)	  
	};

  
//  $().ready(function(){ ////////////////////////////////////////////////////////////////////////////////
// $(function(){ ////////////////////////////////////////////////////////////////////////////////////////////
	  
//	  $('#vpcontr1').draggable();
//	  $('#vpcontr2').draggable();


	  
	  
function Canvas________________________________________________________() {}

positionCanvas= function (info, refContain){
		   refContain=  refContain || $("#vplayers")
		   setTimeout(function(){
			   var vof= refContain.offset(); //.position()
				console.log('positionCanvas '+ info +',  vof=', vof);
				$("#canvas").offset({top: vof.top + 50, left: vof.left +9});
				
				canvasOffset = $("#canvas").offset();
				offsetX = canvasOffset.left;
				offsetY = canvasOffset.top;
				
		   }, 50);
}	 

	function  createCanvas(){

	   var canvas= $('<canvas />').attr({  id: "canvas"
		        , Width: $("#vplayers").width()-8,
		          Height: $("#vplayers").height() -100
		   })
	    
	    $.each(['#f00', '#00f'], function() {
		      $('#erase').before("<button class='brush' style='width: 10px; height: 8px; background: " + 
			          this + ";' onclick='setColor(\""+ this +"\")'  ondblclick='setLwd(11-lwd)' title='dblclick change width of the brush'></button> ");
			});	
	   
	    $('#divcanvas').append( canvas );
	    
	    setTimeout(function(){positionCanvas('$().ready'); runCanvas()
	    		toggleCanv()
	    }, 1000)
	    
	} //createCanvas


	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  function strip_tags(input, allowed) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  }  

function note(_infoRich, rj) {return  _infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'
			  .sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) 
			  :  ' %s, by %s'.sf(rj.title, rj.author_name)
}


function render_YT_URL(ro, value, callback) {  // value is YT_Id or url
  //?  if(value=== undefined || value==null || !value){return ''};

    var escaped = Handsontable.helper.stringify(value);
    
    escaped = strip_tags(escaped, '<em><b><strong><a><big>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
    

   // var yid= escaped.replace(/.*v=|.*youtu.be\/|&.*/g, ''), url= "http://www.youtube.com/watch?v="+ yid;
    var yid= escaped.replace(/.*v=([_0-9a-zA-Z\-]+).*/g, '$1')
      , url= "http://www.youtube.com/watch?v="+ yid;
    console.log('render_YT_URL: value=', value ,  'yid, url=', yid, url)
    //brr  /r07/.test(yid)
    
    
    // bad yid
    if( ! /^[_0-9a-zA-Z\-]{11}$/.test(yid)){return yid}
    
    
    // TODO: fix this block
    // checky yid in dbPL
    var rj= dbPL({YTId:yid}).get()[0]
    var rjb= daPL.filter(function(p){ return p.YTId==yid})
   // if((rjb?1:0) != ( rj?1:0)) alert('(rjb?1:0) != ( rj?1:0)' + tJ(rj))
    
//    if(rj){ 
//    	cl('render_YT_URL: YT id '+ yid + ' is dup in dbPL: '+ tJ(rj))  // is dup?
//
//    	//    	return ''
////??	    	callback(ro, rj, value);
//		//daPL[ro].Info= note(infoRich, rj); //zzz
//        callback(rj);
//        
//	    return yid
//    }

    

	// not dup in dbPL; check in dbVid
    rj= dbVid({yid:yid}).get()[0]
    if(rj != undefined && rj.status == 'gotAjax'){  // ready to use    != 'sent2Ajax'
    	cl('render_YT_URL: '+ yid +' found in dbVid'); 
	    console.log('dbVid({yid:yid})=', rj)
	    
		if(1){	    //??
			callback(rj); 
			//callback(ro, rj, value); 
			return yid
		}	    
    }    

    /// not in db
    var hlink= '<a href="%s" target="_blank">%s</a>'.sf(url, yid)
    // ??

    //    if( dbVid({yid:yid}).select('status') == 'gotAjax') {return;}
    if( dbVid({yid:yid}).select('status') == 'sent2Ajax') {return yid}  //? return yid
    
    cl('to ajax ', yid)
    
    /// not in db, not sent2Ajax
    dbVid({yid:yid}).update({status: 'sent2Ajax'});


	$.ajax({
        url: 'http://query.yahooapis.com/v1/public/yql'
      , data: {
            q: "select * from json where url ='http://www.youtube.com/oembed?url="+ url + "&format=json'",
            format: "json"
        }
      , dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
	  , success: function(result){
    		  var res= result.query.results;
    		  if(res==null) return;
    		  
    		  var rj= res.json, tit= rj.title
              rj.yid= yid; 
              rj.tlink= '<a href="%s" target="_blank">%s</a>'.sf(url, tit)
              
              cl('render_YT_URL: ajax success rj=', rj)

              if(dbVid({yid:yid}).count()==0) dbVid.insert(rj);

         /*??     
              if(dbPL({YTId:yid}).count()==0){
            	 var e= {Id:hashId(tit), YTId:yid
                         , Type:2, Info: note(infoRich, rj), Comment:''}
            	 dbPL.insert(e);
	             // in treatRj    daPL.push(e)
	      	  }
          */    

      
    		  //dbVid({yid:yid}).update({status: 'gotAjax'});
    		  dbVid({yid:yid}).update(function(){this.status= 'gotAjax'; return this});
    		  
    		// {"thumbnail_url": "https:\/\/i.ytimg.com\/vi\/iTc9QclQ_l0\/hqdefault.jpg"
//    			, "title": "[FUN]CARVING Passo Tonale 2012"
//    			, "author_url": "https:\/\/www.youtube.com\/user\/MarshallCZE"
//    			, "author_name": "Luk\u00e1\u0161 Mar\u0161\u00edk"
//    			, "html": "\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/iTc9QclQ_l0?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e"
    	if(0){	  var w=  window.open("", "", "width=800,height=400");
               w.document.write('<html> %s, by <a href="%s">%s</a> <img src="%s" width="200px" heignt="100px"/> %s</html>'
            		            .sf(rj.title, rj.author_url, rj.author_name, rj.thumbnail_url, rj.html))	
    	}	  
    		//  console.log('ajax success: rj=', rj, ', tit=', tit);
    		  callback(rj);
			//	callback(ro, rj, value); 

    	    }
       });
    
    return yid;
  }  /// render_YT_URL	
	

	if(test=0){ render_YT_URL(0, 'https://www.youtube.com/watch?v=d1IXMk6uSAU', function(){alert(tit)})}
	

function hashId(title){ 
	title= title || ''
	//var ids= dbPL().select('Id'), nSymb= $('#idLength').val() || 3 // ids in PL
	//var ids= dbPL().select('Id'), nSymb= sett('nSymb') || 3 // ids in PL
	var ids= daPL.map(function(p){ return p.Id}), nSymb= sett('nSymb') || 3 // ids in PL  TODO: via dbPL
	var h0= title.replace(/\s*/g, '').substr(0, nSymb), h= h0, ss= '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); ss[0]='';
	for(var i=0; i<40;  h= h0 + ss[i++]){ 
		if(ids.indexOf(h)==-1){
			ids.push(h); 
			return h
		}
	}
}



function YTId_Renderer(instance, td, row, col, prop, value, cellProperties) {
    // console.log('YTId_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
	
		if(prop=='Id' && value==null){ td.innerHTML= ""; return td;}
		if(prop=='Id' && value.length <11){ td.innerHTML= value; return td;}
 
	 
    var ro= row, th= this;
    //brr  /r07/.test(value)
    var yid= render_YT_URL(ro, value, function(rj){
		//alert(tit)
    	// infoRich= $('#chri').prop('checked')
 //   	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) :
 //   					     ' %s, by %s'.sf(rj.title, rj.author_name)
    	    			                         
    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);
		// console.log('note=', note)
		daPL[ro].Info= note(infoRich, rj);
		if(prop=='YTId' && !daPL[ro].Id || prop=='Id' &&  value.length > 11) {
			daPL[ro].Id= hashId(rj.title);  //.replace(/\s+ /g, '').substr(0,5);
			daPL[ro].Comment= daPL[ro].Comment || value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')
			daPL[ro].Type= daPL[ro].Type || (dupPL(rj.yid)  ?  'r' : sett('defTy'));
			daPL[ro].YTId= rj.yid;
			//dbPL({YTId:rj.yid}).update(daPL[ro])
			dbPL({YTId:rj.yid}).update(function(){this.pl= daPL[ro]; return this})
		// if(htPL)	htPL.setDataAtCell(ro, 0, daPL[ro].Id);
		//	htPL.setDataAtCell(ro, 1, daPL[ro].YTId);
		}
		//if(!daPL[ro].Comment && value.test('http')) {daPL[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')}
//		if(!daPL[ro].Comment && value.test('http')){daPL[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')}
//?		daPL[ro].YTId= yid;
//		th.setDataAtCell(ro, 4, note); // hlink);
//		if(th.getDataAtCell(ro, 1)=='') {th.setDataAtCell(ro, 1, note.replace(/ /g, '').substr(0,5))}
		
		
		dbPL= TAFFY(daPL)

			})
		
		if(prop=='YTId'){ td.innerHTML= yid;}
        if(prop=='Id')  { td.innerHTML= daPL[ro].Id;}
        
	    return td;
	  }  /// YTId_Renderer	
	 
	 
//	 function PL_Id_Renderer(instance, td, row, col, prop, value, cellProperties) {
//		    // console.log('PL_Id_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
//		    
//		    if(value==null){ td.innerHTML= ""; return td;}
//		    if(value.length < 10){ td.innerHTML= value; return td;}
//		    
//		    var ro=row, th= this;
//		    var yid= render_YT_URL(ro, value, function(rj){
//				//alert(tit)
//		    	// infoRich= $('#chri').prop('checked')
//		    	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) : ' %s, by %s'.sf(rj.title, rj.author_name)
//		    	    			                         
//		    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);
//				// console.log('note=', note)
//				daPL[ro].Info= note;
//				if(!daPL[ro].YTId) {
//					daPL[ro].Id= hashId(rj.title);   //rj.title.replace(/\s+/g, '').substr(0,5);
//					daPL[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')
//					daPL[ro].YTId= rj.yid;
//		         //   td.innerHTML= rj.title.replace(/ /g, '').substr(0,5);
//				//	htPL.setDataAtCell(ro, 0, daPL[ro].Id);
//				//	htPL.setDataAtCell(ro, 1, daPL[ro].YTId);
//				}
//
//			})
//			
//		    return td;
//
//		    if(/<a href/.test(td.innerHTML)) {console.log('skipped', row, col); return td;}
//
//		  }  /// PL_Id_Renderer	


function Video_Renderer1(instance, td, row, col, prop, value, cellProperties) {
//		    console.log('Video_Renderer1: instance, td, row, col, prop, value, cellProperties:'
//		    		, instance, td, row, col, prop, value, cellProperties)
			
		    if(value==null){ td.innerHTML= ""; return td;}
		   // if(value.length != 11){ td.innerHTML= value; return td;}
		    if(! /http/.test(value) && value.length != 11){ td.innerHTML= value; return td;}
		    
		    var ro=row, th= this;
		    var yid= render_YT_URL(ro, value, function(rj){
				//alert(tit)s
		    	// note(infoRich, rj)
		    	
		    	var pl_YTId= daPL.map(function(p){return p.YTId})
		    	  , ro1= pl_YTId.indexOf(yid), type= col <2 ? 1 : 2;

                //daEv[row].Index= daEv.length; 
                daEv[row]['yid'+type]= rj.yid, 
		    	daEv[row]['t'+type]=  daEv[row]['t'+type] || 3 //sec
		    	daEv[row].Phase= daEv[row].Phase || ""
		    		
		    	if(ro1<0) { ///  new video
		    		daEv[row]['Video'+type]=  hashId(rj.title);  //rj.title.replace(/\s+/g, '').substr(0,5)
		    		daPL.push({ // new video
							    		Id: hashId(rj.title), //rj.title.replace(/\s+/g, '').substr(0,5),
										YTId: rj.yid,
										Comment:value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' '),
										Type: type
							    	}) 
		    	} else {daEv[row]['Video'+type]= daPL[ro].Id};
			})
			
		    return td;
		  }  /// Video_Renderer1	

//$('#togr').click(function() {

// //*[@id="togr"]
$('#tbPlaylistsH table').on('click', '#togr', function() {
	cl(77778888)
	alert('#tbPlaylistsH')
	infoRich=  !infoRich
	htPL.loadData(daPL)
})// nOK
// function toggleRich(_infoRich, set) {
//	 infoRich= set? _infoRich : !infoRich;  
//	// daPL=  uniq(daPL, 'YTId')
//	 dbPL= TAFFY(daPL)
//	 htPL.loadData(daPL)
//}

//function toggleRich() {infoRich= !infoRich;  htPL.loadData(daPL)
var toggleRich= function () {infoRich= !infoRich;  htPL.loadData(daPL)
}




//$('#tbPlaylistsH table tbody').on('dblclick', 'tr th', function(evt){
	$('#tbPlaylistsH').on('mousedown', 'th:has(.rowHeader)', function(evt){
	var row= $(this).text()
	htPL2htEv(row-1, true)
}) ;

////$('#tbEventsH').on('dblclick', 'table tbody tr', function(evt){
$('#tbEventsH').on('mousedown', 'th:has(.rowHeader)', function () {
	var index= $($(this).find('.rowHeader')[0]).text();
	console.log('#tbEventsH table tbody index=', index)
	
	go2ev(index-1)
});

  
//  $('.pp').resizable();  // .draggable()


//	  $('#tbSheetrock').sheetrock({
//		//  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=0',
//		//  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//		  url: 'https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json',
//		  query: 'select A,B,C,D,E,F',  //  where C > " "',
//		  fetchSize:10
//		});
	  
//	 sr= sheetrock($('#tbSheetrock')[0], {
//		  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//	//	  query: 'select A,B,C,D,E,F where C > " "',
//		  fetchSize:99676984390
//		});
  
  //v go2ev(0)
  
  $("#test0").click(function(){alert('$("#test").click')
	    $.getJSON("http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x"
	    		, function(re){console.log(re)})
	    
	    function x(result){ alert('x')
	    	console.log('result=', result)
	        $.each(result, function(i, field){
	            $("#testOut").append(field + " ");
	        });
	    };
	});
  
  
  $("#test").click(function(){alert('$("#test").click')

		//ID of the Google Spreadsheet
	  //var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";
      var spreadsheetID= sett('spreadsheetID');
		  
		  // Make sure it is public or set to Anyone with link can view 
		  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
		  
		  $.getJSON(url, function(data) {
		  
		   var entry = data.feed.entry;
		   console.log('entry =', entry )
		  
		   $(entry).each(function(){
		     // Column names are name, age, etc.
		     $('#testOut').prepend('<h4>'+this.gsx$daPL.$t+'</h4>'+this.gsx$points.$t);
		   });
		  
		  });
  
  })
  

function Model_________________________________________ ( ) {}/// Model  ///////////////////////////////////////////////

	function uniq_db(db, key) {
	  	var _db= TAFFY()
	  	db().each(function (p, recordnumber) {
	  		var u=	{}; u[key]= p[key]
	  		if(!db(u).get()[0]) _db.insert(u) 
	  	});
	  	return _db
	}


	function uniq_dbPhases() {
	  	var db= TAFFY()
	  	
	  	dbPhases().each(function (p, recordnumber) {
	  		var u=	{phase:p.phase, yid:p.yid, t:p.t}
	  		if(!db(u).get()[0]) db.insert(u) 
	  		
	  	});
	  	
	  	localStorage.removeItem('taffy_' + "dbPhases");
	  	db.store("dbPhases")
	  	dbPhases= db
	  	return db
	}
	  
  function dupPL(yid) {
		var ids= daPL.map(function(p){return p.YTId})
		return ids.indexOf(yid) > -1
	}

	function uniq(da, key) {
		var yy=[],  // daPL.map(function(p){return p.YTId})
		dau= da.filter(function(p){if(yy.indexOf(p[key]) < 0 && p[key] > ''){
				yy.push(p[key]); return true
				} else return false
		})
		return dau
	}
	//e  daPL=  uniq(daPL, 'YTId')


function Data_Down_______________________________________(){} // gsheet -> HT -> da,db -> videoplayers
  
//function GSheetRange2_HTcells(spreadsheetID, r1, r2, c1, c2, cbfun, db){
function GSheetRange2_HTcells(spreadsheetID, r1, r2, c1, c2, db, cbfun,  sheet){
    //spreadsheetID= spreadsheetID || '170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'
    var spreadsheetID= sett('spreadsheetID');

    sheet= sheet || 'MA'

    var GSheets= {MA:'od6', dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 
// https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/o8ewx2k/public/values?alt=json&min-row=1&max-row=4&min-col=1&max-col=5
// https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/4/public/values?alt=json&min-row=1&max-row=4&min-col=1&max-col=5    
    var urlc= "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID +'/'  + GSheets[sheet]
              + '/public/values?alt=json&min-row='+r1 + '&max-row='+r2 + '&min-col='+c1 + '&max-col='+c2 ;
    console.log('GSheetRange2_HTcells(spreadsheetID, r1, r2, c1, c2, cbfun): urlc =', urlc)
    //$.getJSON(urlc, gcellsToArr(cbfun))
    $.getJSON(urlc, gcellsToArr(cbfun, db))
} 
			 
		  
//function gcellsToArr(cbfun)(data){ 
	function gcellsToArr(cbfun, db){ return function(data){ 
		   var entryc= data.feed.entry, res= [], header= [], rOld=-2;
		   console.log('gcellsToArr: entryc=', entryc )
		   
		   r1= parseInt(entryc[0].gs$cell.row);
		   c1= parseInt(entryc[0].gs$cell.col);
		   
		   for(i=0, l= entryc.length; i<l; i++){
			  var e= entryc[i].gs$cell, r= parseInt(e.row) - r1 - 1, c= parseInt(e.col)-c1;
			  console.log('gcellsToArr: i, r1, rOld, r, c, e.$t =', i, r1, rOld, r, c, e.$t )
		      if(r > rOld+1) {break}; 
		      if(r == rOld+1 && r > -1) {res[r]= {}}; 
		      rOld= r;

			  if(c==0 && r > -1 && e.$t==null) {break} /// break on empty first col in the row - never happens
			  if(r== -1) {header[c]= e.$t} else {
		//		  if(res[r]== undefined){ if(c>0) break; res[r]= {} }; /// break on empty first col in the row
				  cl('r=', r, res)
				  if(e.$t != null) res[r][header[c]]= e.$t
			  } 
		   }
		   
		   //console.log('header =', header )
		   console.log('gcellsToArr: res =', res )
		   
	if(db) eval(db + '= res; '+ db.replace('da', 'ht') + '.loadData(res) ')
	if(cbfun){cl('cbfun =', cbfun ); cbfun(res)}
}}	
  

//function GSheet2_HT(){
//	// alert('GSheet2_HT()')
//	  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";
//
//	  GSheetRange2_HTcells(spreadsheetID, 4, 50, 11, 15, function(playls){console.log('plls10 =', plls)
//		  htPL.loadData(playls) 
//	  });
//	  
//    GSheetRange2_HTcells(spreadsheetID, 4, 40, 1, 9, function(points){console.log('points =', pts)
//  	  htEv.loadData(points) 
//    });
//    
//    
//	  var urlph = 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=131568998/values?alt=json&min-row='+2 + '&max-row='+12 + '&min-col='+1 + '&max-col='+3 ;
//	  console.log('GSheet2_HT: urlc =', urlph)
//	  $.getJSON(urlc, function(res) {console.log('getPh', res)})
//}

//$('#getG').click(GSheet2_HT)
//$('#getG').click(GSheet2_HT())
function GSheet2_HT(sheet){
	  //alert('GSheet2_HT()')
	// db= db|| 'dbPhases'
	// var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";
     var spreadsheetID= sett('spreadsheetID');

	 var GSheets={MA:'0', dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 

	  ///  http://damolab.blogspot.com/2011/03/od6-and-finding-other-worksheet-ids.html
	  
	  // Get all lists descr: https://spreadsheets.google.com/feeds/worksheets/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/private/full
	  //  https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json
	  // dbLog https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/ojacmh6/private/full
	  // dbPl  https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/o8ewx2k/public/values?alt=json
	  // dbPhases https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/o26bz5o/private/full?alt=json
	  // dbVid https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/oevm3xw/private/full
	  
	  
	// https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/131568998/public/full
	  //var urlph = 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=131568998/values?alt=json&min-row='+2 + '&max-row='+12 + '&min-col='+1 + '&max-col='+3 ;
	  //var urlph = 'https://spreadsheets.google.com/list/'+ spreadsheetID +'/' + GSheets.dbPhases + '/public/values?alt=json' ;
	 // var urlph = 'https://spreadsheets.google.com/feeds/list/'+ spreadsheetID +'/' + GSheets.dbPl + '/public/values?alt=json' ;
	 
	  
	  if(sheet){
		  var urlph = 'https://spreadsheets.google.com/feeds/list/'+ spreadsheetID +
		              '/' + GSheets[sheet] + '/public/values?alt=json' ;
		  console.log('getGSpreadsheet2Handst2: urlph =', urlph)
		 // $.getJSON(urlph, function(res) {console.log('getPh:', res)})
		  
		  $.ajax({
	        url: urlph,
	            //data: { alt: "json" },
	            dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
	    	  , success: function(res){console.log('GSheet2_HT: get sheet:', sheet, res)}
		  })		  
	  } else {
//		  GSheetRange2_HTcells(spreadsheetID, 4, 99, 11, 15, function(plls){console.log('plls10 =', plls)
//			  htPL.loadData(plls) 
//			  daPL= plls // htPL.getData()
//		  });
//		  GSheetRange2_HTcells(spreadsheetID, 4, 99, 1, 9, function(pts){console.log('points =', pts)
//			  htEv.loadData(pts) 
//			  daEv= pts // htEv.getData()
//		  }); 
		  
		  GSheetRange2_HTcells(spreadsheetID, 4, 99, 11, 15, 'daPL', filt_keep, 'MA')
	//		  htPL.loadData(daPL) 
	
		  GSheetRange2_HTcells(spreadsheetID, 4, 99, 1, 9, 'daEv', filt_keep, 'MA')
	//		  htEv.loadData(daEv) 

	}
}


//  })  /// on doc ready  ===================================================================================
  

function GSheetPh2dbPh_htEv(){
//	GSheet2db(0, "dbPhases", function(res){
//						dbPhases=TAFFY(res); dbPhases2htEv(1)
//						//gcellsToArr(cbfun)
//		})
		
	GSheetRange2_HTcells(0, 1, 2, 5, 5, function(res){console.log('GSheetPh2dbPh_htEv: res =', res)
		    //htPL.loadData(playls) 
			cl('GSheetPh2dbPh_htEv: fJ(res[0].dbPhases)', fJ(res[0].dbPhases))
				
			var dd= fJ(res[0].dbPhases), daPhases=[];
			dd.map(function(d){ daPhases.push({phase:d[0], t:d[1], yid:d[2]}) })
			dbPhases= TAFFY(daPhases); 
			dbPhases2htEv(true)
		  }, 'dbLog')
}

function GSheet2db(spreadsheetID, db, callback){ // this fun is not really used?
	spreadsheetID= spreadsheetID || sett('spreadsheetID') // '170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'
	db= db || 'dbPl'
	var GSheets= {MA:'od6', dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 

	$.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/'+ spreadsheetID +'/' 
              + GSheets[db] + '/public/values?alt=json' 
        , dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
    	, success: function(res){	console.log('GSheet2db: ', db, res)
			    		callback(res)
					}
    	, error: function(xhr, status, err){console.log('GSheet2db: Err ', xhr, status, err)}
	})
}
// test: GDoc2db(0, dbPhases, 0)

//all==T  only from dbPL
function dbPhases2htEv(all){
	//var db= dbPhases().join(dbPL, function (l, r) { return (l.yid === r.YTId); }); //get Id
	var db= dbPhases(); //get Id
	if(!all) db= db.join(dbPL, function (l, r) { return (l.yid === r.YTId); }); //get Id
	var dat= db.order('t').order('Id')//.get()

	//evData_Filled= dat;  //?? used by go2ev
	
	dat.each(function (p, recordnumber) {
		  //daEv.push({Video2:'http://www.youtube.com/watch?v='+p.yid, t2:p.t, Phase:p.phase, SSI:p.yid, BM: d.Info}) //zz
		  $.extend(daEv[recordnumber], {Video2:'http://www.youtube.com/watch?v='+p.yid
			     , t2:p.t, Phase:p.phase, SSI:p.yid, BM: p.Info}) //zz
		 // }
	});
	
	if(0){
		for(i=0, l= dat.length; i<l; i++){ var d= dat[i];
			daEv[i].Video2= 'http://www.youtube.com/watch?v='+d.yid  // dat[i].Id; 
			daEv[i].t2= d.t;
			daEv[i].Phase= d.phase;
			daEv[i].SSI= d.yid;
			daEv[i].BM= d.Info;
		}
	}

	htEv.loadData(daEv)
		
//	console.log('get_dbPhases2htEv: db.get()=', db.get())
//	console.log('get_dbPhases2htEv: dat=', dat)
//
//	htEv.updateSettings({
//		//data: dbPhases().order('t').order('yid').get()
//		data: dat
//		//colHeaders: 'Video1 t1 Video2 t2 Phase SSI BM TD img'.split(" "),
//
//		//, colHeaders: 'yid phase t'.split(" ")
//		, columns: [{data:'Id'},{data:'t'}, {data:'Id'},{data:'t'},{data:'phase'},{data:'yid'},{data:'Info', renderer: "html"}]
//	})
//	htEv.loadData(dat)
}

function LoadPlaylists(ev0){console.log('LoadPlaylists: from ', daPL); //alert(daPL)
		ev0= ev0 || 0;


		var plt= fillPlaylistsDict()  // dup with following ?

//		var pl=[[], []]; // pl[0]=[]; pl[1]=[];
//		for(var i=0, l= daPL.length; i<l; i++) if(daPL[i].YTId > ''){
//	  			var p=daPL[i], t= p.Type-1;
//	  			if(t==0 || t==2) if(pl[0].indexOf(p.YTId) < 0) { pl[0].push(p.YTId) }
//	  			if(t==1 || t==2) if(pl[1].indexOf(p.YTId) < 0) { pl[1].push(p.YTId) }
//	  			//if(pl[t].indexOf(p.YTId) < 0) { pl[t].push(p.YTId) }
//	  		}
//		console.log('pl=', pl);
////	    pp[1].loadPlaylist(pl[0]); setTimeout(function(){pp[1].pauseVideo().seekTo(0)}, 1000);
////		pp[2].loadPlaylist(pl[1]); setTimeout(function(){pp[2].pauseVideo().seekTo(0)}, 1000);
//
//	    pp[1].cuePlaylist(pl[0]); 
//		pp[2].cuePlaylist(pl[1]);
	    pp[1].cuePlaylist(plt[1]); 
		pp[2].cuePlaylist(plt[2]);
		
		fillEvs()
		
      htEv.getCellMeta(daEv.length-1, 0).comment= 'You can paste youtube Id or links to this cell';
      htEv.getCellMeta(daEv.length-1, 2).comment= 'You can paste youtube Id or links to this cell';
		htEv.render();

		//go2ev(ev0);
		setTimeout(function(){go2ev(ev0)}, 3000)

		
	if(plt[1].length > 0)	pp[1].playVideo().pauseVideo()  // stop buffering ??
	if(plt[2].length > 0) pp[2].playVideo().pauseVideo()
}

function all_dbVid2daPLhtPL() {
	  dbVid().each(function (p, recordnumber) {
		daPL.push({ // new video
		Id: hashId(p.title), //rj.title.replace(/\s+/g, '').substr(0,5),
			YTId: p.yid,
			Comment:p.title,
			Type: 3
	}) 
	  })

	  htPL.loadData(daPL)
	  $("html, body").animate({scrollTop: $('#tbPlaylistsH').offset().top-40} , 300)
}

function db2ht(db, htContainer) {
	  var htContainer= htContainer ||  $("#testOut")
	  var db= db || dbEv, da= (typeof db =='function') ? db().get() : db.get();
	  	cl('db2ht(db) db=dbEv, da=', da)
	   
	  	htDB= new Handsontable(htContainer[0], {
	  		data: da
	  		, colHeaders: Object.keys(da[0])
	  	})
	  }  

function htPL2htEv(i, toDelete) {
	var p= daPL[i], c1= p.Type==1 || p.Type==3, c2= p.Type==2 || p.Type==3//dbPL()
	
	if(toDelete) if(p.Type==0 || p.Type=='r'|| p.Type=='rr'){
		htPL.alter ('remove_row', index-1)
        if(p.Type=='rr'){dbVid({yid:p.YTId}).remove()
        	dbPL({YTId:p.YTId}).remove()
        	return
        }  //if(window.confirm("remove from dbVid " + tJ(dbVid({yid:p.YTId}).get())))
        if(p.Type=='r'){dbPL({YTId:p.YTId}).remove(); return}  // if(window.confirm("remove from dbPL " + tJ(dbPL({YTId:p.YTId}).get())))
		
		return
	}
	
	//console.log('#tbPlaylistsH table tbody index, p=', index, p)
	
	daEv.push({Video1: c1 ? p.Id :'', t1: c1 ? sett('defSec') :''
			   , Video2: c2 ? p.Id :'', t2: c2 ? sett('defSec') :''
			   , Phase: p.Comment //Info
	})
   dbEv.insert({Video1: c1 ? p.Id :'', t1: c1 ? sett('defSec') :''
	          , Video2: c2 ? p.Id :'', t2: c2 ? sett('defSec') :''
		   , Phase: p.Comment //Info
	})
	
	// if(c1) pp[1].playVideo().pauseVideo()  // stop buffering 
	// if(c2) pp[2].playVideo().pauseVideo()
}

function go2ev(iEvent){  // i = row in table Events
	  var selection = htEv.getSelected()
	  iEvent= iEvent != undefined ? iEvent : selection == undefined ? 0: selection[0] 
	  
	  fillEvs()
	  var e= evData_Filled[iEvent];  console.log('go2ev:', iEvent, e); 

	  if(playlistsDict[e.Video1]){
	  	  console.log('playlistsDict[e.Video1].YTId:', playlistsDict[e.Video1].YTId); 
		  pp[1].go1Vid(playlistsDict[e.Video1].YTId, e.t1)
	  } else {cl('playlistsDict [' + e.Video1 + '] does not exists !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')}
	  
	  if(playlistsDict[e.Video2]){
	  	  console.log('playlistsDict[e.Video2].YTId:', playlistsDict[e.Video2].YTId); 
		  pp[2].go1Vid(playlistsDict[e.Video2].YTId, e.t2)
	  } else {cl('playlistsDict [' + e.Video2 + '] does not exists !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')}
	  
   //htEv.selectCell(iEvent, 0) 
   htEv.selectCell(iEvent, 0, iEvent, htEv.countCols()-1) 


	  $('#inpCurrPoint').val(iEvent+1)
	  $('#inpPh').val(e.Phase)
	  $('#taSS').val(e.SSI)
	  $('#taBM').val(e.BM)
	  $('#taTD').val(e.TD)
	  // draw  lines
   if(e.lines) setTimeout(function(){for (var i = 0; i < e.lines.length; i++) { drawLine(e.lines[i])} }, 4000)
}


function Data_Up_______________________________________(){} 

function ht2db(ht, add2) {
  	ht= ht || htEv
  	add2= add2 || []
  	var jj= ht.getColHeader(), dav= ht.getData()
  	
  	for(var i=0, l=dav.length; i<l;i++){
  		var d= {}
  		for(var j=0, lj=dav[0].length; j<lj;j++){
  			d[jj[j]]= dav[i][j]
  		}
  		add2.push(d)
  	}
  	return TAFFY(add2)
  }

function htEv2dbPhases(clean){
	clean= clean || false
    var db= clean ? TAFFY() : dbPhases;
	
	for(i=0, l= daEv.length; i<l; i++){var e= daEv[i];
	console.log('htEv2dbPhases: i,e=', i, e)

	 if(e.Phase) db.insert({yid:dbPL({Id:daEv[i].Video2}).get()[0].YTId, phase:e.Phase, t:e.t2})
    }
	console.log('htEv2dbPhases: db().get()=', db().get())
	console.log('htEv2dbPhases: db().distinct()=', db().distinct("phase","t","yid") )
	if(!clean) dbPhases= db
	return db
}


/// $('#btMatch').click(matchPhase)

function matchPhase(ph){
	  ph= ph || $('#inpPh').val();
	  //dbVid({phases:{has:phase.eq.$('#inpPh').val()}})
	  //dbPhases().insert({phase:$('#inpPh').val(), yid:vid2, t:$('#t2').val()}) 
	  
	  /// remove dups and phase==''
	  var un= dbPhases().distinct("phase","t","yid");  // order alphabetic
	  dbPhases().remove();
//	  for (var i=0, l=un.length; i<l;  i++) {u= un[i];...} 
	  un.map(function(u){ if(u[0] && u[1]*1) dbPhases.insert({phase:u[0], yid:u[2], t:u[1]}) })

	  console.log('matchPhase: remove dups: un, dbPhases', un, dbPhases().get())	  
	  
	  dbPhases({phase: ph}).each(function (p, recordnumber) {
		  daEv.push({Video2:'http://www.youtube.com/watch?v='+p.yid, t2:p.t, Phase:$('#inpPh').val()}) //zz
		});
	  
//    var phs= dbPhases({phase:$('#inpPh').val()}).get()
//    phs.map(function(p){daEv.push({Video2:p.yid, t2:p.t, Phase:$('#inpPh').val()}) })
	  htEv.loadData(daEv)	
}

function fillEvs(){  /// fill empty cells in daEv
		var evData_Filled=[];	
		
			  for (var i=0, l= daEv.length; i<l; i++){ evData_Filled[i]= {}  // evData_Filled[i] || {};
				//for (var key in daEv[i]) {
					for (var key in daEv[0]) {  //??
						//if (daEv[i].hasOwnProperty(key)) {  
							if (daEv[0].hasOwnProperty(key)) {  
			  
			    evData_Filled[i][key]= daEv[i][key];
			    if( i > 0  && (key=="Video1" || key=="Video2"||key=="t1" || key=="t2") 
			               && (evData_Filled[i][key]==null || evData_Filled[i][key]==undefined || evData_Filled[i][key]=='' ) 
			      ) evData_Filled[i][key]= evData_Filled[i-1][key];
			  }
			}
		}
		return evData_Filled;
}

function db2GSheet() {
      request= $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbwUv4gQ7KqdZU4xcovE595iUGDWiewTteyuUqgAmll3Mf9iA6M/exec',
          type: 'post', 
          data: {dbPhases: tJ(dbPhases().distinct('phase', 't', 'yid'))
        	   , dbVid: tJ(dbVid().distinct( "author_name","author_url", "status","thumbnail_url", "title", "yid"))
        	   , dbEv: tJ(dbEv().distinct("BM","Phase","SSI","TD","Video1","Video2","t1","t2"))
        	   , dbPL: tJ(dbPL().distinct("Comment","Id","Type", "YTId"))  // "Info":"<html><img src=\"https://i.ytimg.com/vi/TSDx6RK15es/hqdefault.jpg\" height=\"36px\"/> <a href=\"http://www.youtube.com/watch?v=TSDx6RK15es\" target=\"_blank\">Med radius turns, at Palmer Field</a>, by <a href=\"https://www.youtube.com/channel/UCOe3pqY-gde3_Ac_u9-a_cA\">Alex  Zolotovitski</a> </html>"
          }, 
          success: function(e){console.log('Log to G-Sheets ajax success '+JSON.stringify(e))}, 
          error: function(e){console.log('Log to G-Sheets ajax fail '+ JSON.stringify(e))}
       });
}

function LogCurrentPoint(){  // to htEv
	  var vid1= pp[1].getVideoData().video_id, vid2= pp[2].getVideoData().video_id;
	  daEv.pop()  // remove empty last row
  	  daEv.push({ //Index:daEv.length+1,
  		 Video1: playlistsDictY[vid1].Id || vid1, 	t1: $('#t1').val()
  		, Video2: playlistsDictY[vid2].Id || vid2, 	t2: $('#t2').val()
  		, Phase:$('#inpPh').val(), SSI:$('#taSS').val(), BM:$('#taBM').val(), TD:$('#taTD').val(), lines:lines})  //? tJ(lines)
  		
  		evData_Filled= fillEvs();
  	  
	  htEv.loadData(daEv)
	  htEv.scrollViewportTo(htEv.countRows()-1, 4)
	  htEv.selectCell(htEv.countRows()-1, 4)
	  //$('#tbEventsH').handsontable('selectCell', htEv.countRows()-1, 5, htEv.countRows()-1, 5, scrollToSelection = true)
	  
 
 //	  dbVid({yid:vid1}).update(function(){
//			  this.phases= this.phases ||[];
//			  this.phases.push({t:$('#t1').val(), phase:$('#inpPh').val()}); return this
//		  })
//		  
//	  dbVid({yid:vid2}).update(function(){
//			  this.phases= this.phases ||[];
//			  this.phases.push({t:$('#t2').val(), phase:$('#inpPh').val()}); return this
//		  })
		  
	var u=	{phase:$('#inpPh').val(), yid:vid2, t:$('#t2').val()}  
  	//if(dbPhases(u).count()==0) { dbPhases.insert(u) 
  	if(!dbPhases(u).get()[0]) { dbPhases.insert(u) 
		dbPhases.store("dbPhases")
	}
		  
	  console.log('LogCurrentPoint  dbVid=', dbVid().get())
	  console.log('LogCurrentPoint  dbPhases=', dbPhases().get())
	  
	  
	  //db2GooSheet()
	  
	  
	  // need it?
	  /*
       request= $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbwUv4gQ7KqdZU4xcovE595iUGDWiewTteyuUqgAmll3Mf9iA6M/exec',
          type: 'post', // "post",
          //data: 'az=1,3,7&bb=4,5,8sd',
          //data: 'az=[1,3,7]&bb={"x":["4", "5", "8sd"], "y":["y4", "y5", "y8sd"]}',
          data: encodeURI('Video1='+ playlistsDictY[vid1].Id +'&t1='+ $('#t1').val() +
          '&Video2='+ playlistsDictY[vid2].Id +'&t2='+ $('#t2').val() +'&Note=' +   // Note-> Info?
          '&SSI='+  $('#taSS').val() +'&BM='+ $('#taBM').val() +'&TD='+ $('#taTD').val() +
          '&YTId1='+ vid1 +'&YTId2='+vid2),
          //data: 'az=23&bb=78',
          //data: JSON.stringify({a:12, b:37})
          success: function(e){console.log('Log to G-Sheets ajax success '+JSON.stringify(e))}, 
          error: function(e){console.log('Log to G-Sheets ajax fail '+ JSON.stringify(e))}
       });
	*/
  }

function removePhase() {
	
	var u=	{phase:$('#inpPh').val(), yid:pp[2].getPlaylist()[pp[2].getPlaylistIndex()], t:$('#t2').val()}  
  	if(!dbPhases(u).get()[0]) { dbPhases.insert(u) 
		dbPhases.store("dbPhases")
	}
	
	dbPhases(u).remove();
	dbPhases= uniq_dbPhases()
	localStorage.removeItem('taffy_' + "dbPhases");
	dbPhases.store("dbPhases")
	
}

function daEvPL2email() {
	var j=tJ({daEv:daEv, daPL:daPL})
	window.open('mailto:alex.zolot@gmail.com?subject=MAToolData&body=' +j);
}




function  Controller_______________________________________(){} /// Controller  ////////////////////////////////////////////////////////////////////////////

  function toggleDev() {
		$("#for-developers").toggle(); 
		setTimeout(function(){$("html, body").animate({scrollTop: $(document).height()-$(window).height()}
			                                   , 500)
			       }
		, 100)
	}

  function toggleSet() {$("#settings").toggle()	}
  
  
  
  //   debugging misc funcs  ///////////////////////////////////////////////////
  function evall() {
  	eval($('#ta').val())
  }  
    


//$(function(){ ////////////////////////////////////////////////////
	// treat query string
  
  /*
  cd ~m/99_family/43_ski/out/www.vue
  python -m SimpleHTTPServer 8000
  
  http://localhost:8000/mav.htm?keep=2&type=3&yt=  https://www.youtube.com/watch?v=i-lgX65esDo v22 v33 https://www.youtube.com/watch?v=XpA9XXa7vAU
  http://localhost:8000/mav.htm? https://www.youtube.com/watch?v=i-lgX65esDo v22 v33 https://www.youtube.com/watch?v=XpA9XXa7vAU

  http://localhost:8000/mav.htm?gsheetid=zzz&keep=0&type=3&yt= https://www.youtube.com/watch?v=Up9v4HvgIhw&list=PLU2mZrfZu7XEMRCILFWx_g9BOEpuQYtR8&index=2https://www.youtube.com/watch?v=fnrAWNaDYlc&t=2s&list=PLU2mZrfZu7XEMRCILFWx_g9BOEpuQYtR8&index=1
*/
  

	function filt_keep(){//qsPars
		
		if(qsPars.keep=='0') { // htEv.clear(); htPL.clear(); 
			daPL= []; daEv= []; dbPL= TAFFY(daPL); dbEv= TAFFY(daEv); 
		}
		if(qsPars.keep=='1' || qsPars.keep=='2'){
			daPL= daPL.filter(function(p){return p.Type== qsPars.keep*1})
			daEv= daEv.map(function(e){var rm= 3 - qsPars.keep; e['Video'+ rm]= ''; e['t'+ rm]= ''; return e })
			dbPL= TAFFY(daPL); dbEv= TAFFY(daEv)
		} 
		cl('treat_qsPars: Before "GET"  daPL=', daPL)
		cl('treat_qsPars: Before "GET"  daEv=', daEv)
		
		treat_qsPar_yt()
		
		try {htPL.loadData(daPL)} catch(err) {cl("Err1: " + err)}
		try {htEv.loadData(daEv)} catch(err) {cl("Err2: " + err)}
	}
	
	
	function treat_qsPar_yt(){//qsPars
		if(qsPars.yt && qsPars.yt.length){

			cl('treat_qsPars: wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww  treat query string qsPars.yt=', qsPars.yt)
			
			var c='', yid
			
			var nrowPL= daPL.length, nEv=daEv.length;

			qsPars.yt.replace(/\s*http/g,'zz1http')
		          .replace(/(http\S+)\s*/g,'$1zz2').split(/\s*zz1|zz2\s*|yt=/) //?? treat tail uid
			.map(function(q){ cl('111 qs.map q=', q)
//				if(q.length==1) { var yid= q.replace(/.*http/, 'http'), c= q.replace(/http.*/, '');
//				} else {yid= q[1]; c= q[0]}
				if(! /http/.test(q) ) {c= q
				} else { yid= q
						var  ty= qsPars.type || sett('defTy'), t= qsPars.time*1 || sett('defSec')
						//daPL.push({YTId: yid, type:ty, Comment:c}) 
					 	daPL.push({Id: yid, Type: ty*1, Comment:c}) 
//						daEv.push(ty==1 ? {Video1:yid, t1:t, Phase:c}
//							    : ty==2 ? {Video2:yid, t2:t, Phase:c}
//							    :  {Video1:yid, t1:t, Video2:yid, t2:t, Phase:c}  //ty==3 ?
//						)
					c=''
					}
//				var yid= (q.length==1) ? q[0].replace(/.*http/, 'http'): q[1]
//				var c  = (q.length==1) ? q[0].replace(/http.*/, '')    : q[0]
//				
		    	cl('treat_qsPars: 222 yid, c=', yid, c)
//				daPL.push({YTId: yid, type:3, Comment:c}) 
//				daEv.push({Video2:yid, t2:2, Phase:c})
			})
			
			//take uniq
			

			
//			var yy=[]  // daPL.map(function(p){return p.YTId})
//			daPL= daPL.filter(function(p){if(yy.indexOf(p.YTId) < 0 && p.Id > ''){
//					yy.push(p.YTId); return true
//					} else return false
//			})
			//daPL=  uniq(daPL, 'YTId')
			dbPL= TAFFY(daPL)
			
			htPL.loadData(daPL)
			//brr 
			
			//htEv.loadData(daEv)  
			//{column:{like:value}}
			//dbPL({YTId:{gt:'0'}}).each(function (p, i) {
			dbPL().each(function (p, i) {
				if(i >= nrowPL || qsPars.keep=='0') htPL2htEv(i, false)
			})
			
			
			//htEv.loadData(daEv)
			
			setTimeout(function() {htPL.loadData(daPL);	
			                       setTimeout(function() {htEv.loadData(daEv)	}
			                       , 1000)}, 500)
			
			
			
			//setTimeout(function(){LoadPlaylists(daEv.length-1)}, 1000)

		} //qsPars.yt
	}
  
  function treatQueryString(aa) {
	    if (aa == "") return [];
	    
	    cl('aa', aa)
	    cl('treatQueryString: decodeURIComponent(aa)=', decodeURIComponent(aa))

      var r= {keep:3, type:3, yt:[], gsheetid:'170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'}
	     , sep= /(keep=|type=|yt=|gsheetid=|time=)/g,  //decodeURIComponent(aa)        //.split('&')
         b= aa. map(function(a){
		             return decodeURIComponent(a).replace(sep,'zz1$1')
			          .replace(sep,'$1zz2').split(/\s*zz1|zz2\s*/)
			          .notEmpty()
			 })
	    cl('treatQueryString: treat in query string  b=', b)
	     
	    b.map(function(q){ // cl('b.map q=', q)
			if(q.length==1) {  // yt  directly after '...com?'
				r.yt= q[0]} else r[q[0].replace(/=$/, '')]= q.length==2 ? q[1] : q.slice(1)
		})
		cl('treatQueryString: out query str  r=', r)
	    return r
	}
  

	function treat_qsPars(qsPars){
		//qsPars = qsPars || treatQueryString(window.location.search.substr(1).split('&')) || {};
		qsPars = qsPars || {};

	console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  treat_qsPars: qsPars =', qsPars)

	if(qsPars.gsheetid){ 
		daSett= daSett.map(function(p){ p.value=(p.name=='spreadsheetID') ? qsPars.gsheetid : p.value; return p})
		GSheet2_HT(); 
		//GSheet2db(null, 'MA', function(res){cl('treat_qsPars: if(qsPars.gsheetid): MA res=', res)}); //LoadPlaylists()	
	} else qsPars.gsheetid='170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'; //1N_Q2aDghKX-BkC9cRwFrxY_ttxoEQuqJEMGvCW2MUCE
	// MA2: 1LNGbHzhgto8cawjAre7-X3fOBQ08sJwwgZzvgd_rdSc
	
	//setTimeout(filt_keep, 500)
	//filt_keep()
	
	//treat_qsPar_yt()


	return qsPars
}
	
	
function sett(nm) {return daSett.filter(function(s){return s.name==nm})[0].value}
// test: sett('defTy');	sett('spreadsheetID')
	
	

  /*
   sequence:   assign data from js
			   treat qs;
			   if gsheetid  assign data, daSett from gsheet
			   if yt , keep incl it into data
			   create YTPlayers, based on data 
   */
  
  
function  Run_______________________________________(){} /// Execution  ////////////////////////////////////////////////////////////////////////////

var cl= console.log;
var evData_Filled, currEvent=0;
var infoRich= true;


var vm = new Vue({
			el: '#app',
			data: {}
  
		});


    /// Handsontables:  Sett, PL,  Events, db 
    var htEv,  htPL; 
    var daPL= [//{Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:3, 	Info:"R", 	Comment:""}, 
  	  //{Id:"Z", 	YTId:"4oiPmaBlJNA", 	Type:3, 	Info:"Zep", 	Comment:""}, 
            //    {Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:2, 	Info:"med", 	Comment:""}, 
                     {Id:"AZ1", 	YTId:"TSDx6RK15es", 	Type:1, 	Info:"Med radius turns, at Palmer Field, by Alex Zolotovitski", 	Comment:""}, 
                     {Id:"AZ2", 	YTId:"urAXN77X6zU", 	Type:1, 	Info:"3 runs on Outland 87 x 178, by Alex Zolotovitski", 	Comment:""}, 
                     {Id:"==", 	YTId:"==", 	Type:"", 	Info:"", 	Comment:""}, 
                     {Id:"Reilly", 	YTId:"t334XENKLFo", 	Type:2, 	Info:"Reilly Ski Training 2012.mov, by Reilly McGlashan", 	Comment:"32-bumps, 75-med back, 87-short, 129=med"}, 
//                     {Id:"Berger", 	YTId:"5SZqiCggJN8", 	Type:2, 	Info:"Imagination Richard Berger, by Dnalor Elraes", 	Comment:""}, 
                     {Id:"BASI", 	YTId:"SgrO7Dprl6g", 	Type:3, 	Info:"BASI level 4 interpretation by Jon AhlsÃƒÂ©n, by Jon AhlsÃƒÂ©n", 	Comment:"22-short back, 33-med,71-bumps,114-med"}, 
//                     {Id:"CSIA", 	YTId:"aiSzmN82I4A", 	Type:2, 	Info:"Training demos for the level 4 CSIA 2013, by Javier Fuentes", 	Comment:""}, 
                     {Id:"PSIANW", 	YTId:"HrCfQR3qwi0", 	Type:2, 	Info:"LEVEL III - MEDIUM RADIUS TURNS, by BaileyPSIANW", 	Comment:""}, 
//                     {Id:"JfB29", 	YTId:"r07Ea0TYkaA", 	Type:2, 	Info:"Jf Beaulieu: Video 29, by Jf Beaulieu", 	Comment:"1. Carving -"}, 
//                     {Id:"Landes", 	YTId:"ZoRsJYRmD5k", 	Type:2, 	Info:"Landes 1 Mogul Training Ski Instructor Academy 2013, by SIA Austria", 	Comment:"2. Bumps -"}, 
                     {Id:"ReMog", 	YTId:"cIMfJKslkyo", 	Type:2, 	Info:"Reilly McGlashan Spring Mogul Skiing Niseko Japan 2016, by Reilly McGlashan", 	Comment:"3. Bumps -"} 
//                     {Id:"Cats", 	YTId:"9Y0v2tpSP0s", 	Type:2, 	Info:"Cat skiing with Selkirk Powder @ Schweitzer Mountain, by Thomas Smiley", 	Comment:"4. Powder -"}, 
//                     {Id:"Powder", 	YTId:"vp4OgUjJx2M", 	Type:2, 	Info:"Powder 101 with CMH - Powder Intro with Roko, by skipurepowder", 	Comment:"5. Powder -"}, 
//                     {Id:"ReTu", 	YTId:"aJVhrraLRkw", 	Type:2, 	Info:"Reilly McGlashan - Long turn to short turn rhythm change, Hokkaido Technical Ski Championships 2016, by Reilly McGlashan", 	Comment:"6. Turn Variation -"}, 
//                     {Id:"JBa", 	YTId:"i-lgX65esDo", 	Type:2, 	Info:"Jonathan Ballou - Medium Turns, by Jonathan Ballou", 	Comment:""}, 
//                     {Id:"BB", 	YTId:"XpA9XXa7vAU", 	Type:2, 	Info:"JF Beaulieau & Jonthan Ballou TC August 2014, by Jonathan Ballou", 	Comment:""}, 
//                     {Id:"JfB3", 	YTId:"Us85e6y-NCE", 	Type:2, 	Info:"video 3: Expert skiing, various situations: Jf beaulieu training in Whistler, April, 2014, by Jf Beaulieu", 	Comment:""}, 
//                     {Id:"CPow", 	YTId:"fdaudGMBaO0", 	Type:2, 	Info:"Tips Up Ã¢â‚¬â€œ How To Steer Your Skis Through Powder, by Canadian Ski Council", 	Comment:"Powder"},  
  //   {Id:"BASIA", 	YTId:"YsIvjr1uH-4", 	Type:1, 	Info:"BASI Alpine  Level 4 Bumps.mpg, by OfficialBASI", 	Comment:""}, 
  //   {Id:"SKIIN", 	YTId:"7tyY8A8hobc", 	Type:1, 	Info:"SKIING LEVEL 4 BASI ISTD, by admirallimos admirallimos", 	Comment:""}, 
  //   {Id:"BASIL", 	YTId:"tG4g62wTZXg", 	Type:1, 	Info:"BASI Level 4 Criteria - Short turns, Long turns and Bumps, by Altitude Futures - Ski & Snowboard Instructor Courses", 	Comment:""}
    ]; 


    var daEv=[//{	Video1:"R", 	t1:4.31, 	Video2:"Z", 	t2:377, 	Info:"R, apex", 	SSI:"sss", 	BM:"banbb", 	TD:"outsi" 	},
//  	  {	Video1:"Z", 	t1:4.31, 	Video2:"R", 	t2:4.89, 	Info:"R, apex", 	SSI:"sss", 	BM:"banbb", 	TD:"outsi" 	},
  	      {Video1:"AZ1", 	t1:4.31, 	Video2:"PSIANW", 	t2:4.89, 	Phase:"m3", 	SSI:"small edge angle", 	BM:"banking", 	TD:"outside arm too high and back" 	},
        {Video1:"", 	t1:5.94, 	Video2:"", 	t2:5.82, 	Phase:"", 	SSI:"", 	BM:"outs arm low", 	TD:"poll in arms, parallel to ground" 	},
        {Video1:"", 	t1:7.8, 	Video2:"", 	t2:6.75, 	Phase:"m9", 	SSI:"small edge angle", 	BM:"hips too high", 	TD:"more ang before apex; look at dir of travel" 	},
//        {Video1:"", 	t1:8.75, 	Video2:"", 	t2:8.08, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	},
        {Video1:"", 	t1:4.49, 	Video2:"Reilly", 	t2:63.61, 	Phase:"m3", 	SSI:"", 	BM:"", 	TD:"" 	},
        {Video1:"AZ2", 	t1:50.7, 	Video2:"", 	t2:69.74, 	Phase:"m3", 	SSI:"", 	BM:"", 	TD:"" 	},
////        {Video1:"", 	t1:50.7, 	Video2:"Berger", 	t2:413.83, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	}
        {Video1:"", 	t1:50.7, 	Video2:"BASI", 	t2:65.14, 	Phase:"m3", 	SSI:"", 	BM:"", 	TD:"" 	}
        ]
//        {Video1:"BASIL", 	t1:83.25, 	Video2:"JBa", 	t2:2.65, 	Phase:"Long - Med turns", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:93.29, 	Video2:"JBa", 	t2:4.84, 	Phase:"Long - Med turns. 9oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:94.03, 	Video2:"JBa", 	t2:5.24, 	Phase:"Long - Med turns. trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:94.9, 	Video2:"JBa", 	t2:5.77, 	Phase:"Long - Med turns. 3 oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:96.07, 	Video2:"JBa", 	t2:6.54, 	Phase:"Long - Med turns. trans to left", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:129.26, 	Video2:"ReMog", 	t2:1.39, 	Phase:"Bumps, trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:129.78, 	Video2:"ReMog", 	t2:2.19, 	Phase:"Bumps, trans to L", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:28.3, 	Video2:"Reilly", 	t2:18.6, 	Phase:"Short", 	SSI:"", 	BM:"", 	TD:"" 	},
//        {Video1:"BASIL", 	t1:31.29, 	Video2:"Reilly", 	t2:18.7, 	Phase:"Short, 8 oc", 	SSI:"", 	BM:"", 	TD:"" 	}]; 



    var dbPL= TAFFY(daPL); console.log('dbPL = ', dbPL().get());
    var dbEv= TAFFY(daEv); console.log('dbEv = ', dbEv().get());
    var dbVid= TAFFY(); dbVid.store("dbVid"); console.log('dbVid = ', dbVid().get()); // localStorage.dbVid
    var dbPhases= TAFFY(); dbPhases.store("dbPhases"); 
    dbPhases= uniq_dbPhases()
    console.log('dbPhases = ', dbPhases().get()); // localStorage.dbVid
  //  dbPL().remove()
  //  dbVid().remove() ; localStorage.clear()
    
    
	

	///  Settings ========================
    var qsPars={}

	var daSett=[{name:'defTy', Parameter:'Defaut video Type\n1 -Left Player, 2 -right, 3 - both', value:3}
		      , {name:'defSec', Parameter:'Default t, sec', value:2}
		     , {name:'nSymb', Parameter:'Default # symb in Id', value:3}
		     //, {name:'spreadsheetID', Parameter:'G-sheet (to copy-paste the data)', value:"170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI"}
		     , {name:'spreadsheetID', Parameter:'G-sheet (to copy-paste the data)'
		    	 , value: qsPars.gsheetid? qsPars.gsheetid: '170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'
		     }
		]
	
	qsPars= treat_qsPars(treatQueryString(window.location.search.substr(1).split('&')))

	htSett= new Handsontable($("#tbSett")[0], {
		data: daSett,
		colHeaders: 'name Parameter Value'.split(" "),
		rowHeaders: false, stretchH: 'all'})


    var playlistsDict={}, playlistsDictY={}, plt={1:[], 2:[]}; // by Id; by YTId; by player type
        
    fillPlaylistsDict();


    // 2. This code loads the IFrame pp[1] API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


	setTimeout(createCanvas, 3000);
	
	
	var isCanv= true
	toggleCanv= function(){
					isCanv= !isCanv; 
					$('#canv-tools').toggle(); 
					$('#canvas').css('z-index', isCanv ? 15 : 0)
					//$('#bt-draw').html(isCanv ? "X" :"Draw")
					$('#bt-draw').toggleClass('glyphicon-pencil glyphicon-remove-circle') //$('#fullscr'+ip).text('fs')
				}
	
	//setTimeout(toggleCanv, 4000);

	  evData_Filled= fillEvs();
	  
	  $('#v1').height(9./16 * $('#v1').width())
	  $('#v2').height(9./16 * $('#v2').width())
	  
	  

htPL= new Handsontable($("#tbPlaylistsH")[0], {
		data: daPL,  //dbPL().get(), //
		minSpareRows: 1,
		height: 296,
	    colHeaders: function(j) {
			  return j==3 ? 'Info &nbsp; &nbsp; &nbsp;     <i  onclick="toggleRich()" class="fa fa-copy" style="font-size: 14px; float: right" ' + 
			//		  return j==3 ? 'Info &nbsp; &nbsp; &nbsp;    <i  onclick="toggleRich()" class="fa fa-copy"  ' + 
						    '  title="toggle Info to Plain Text before copy the table to Excel or G-Sheets Ctrl-A,Ctrl-C "> Toggle before copy</i> &nbsp; &nbsp; &nbsp;'
            		              : 'Id YTId Type Info Comment'.split(" ")[j]
	    },
		//rowHeaders: true,
		rowHeaders: function(i) {return '<span title="Click here to push the video to the  <Points for MA>  table">'+ i +'</span>'},

		stretchH: 'all',
		contextMenu: true,
		readOnly: false,
		columns: [
		  {data: 'Id' , type: 'text' , renderer:YTId_Renderer }, //?}, // PL_Id_Renderer 
		  {data: 'YTId' , type: 'text', renderer: YTId_Renderer, width: 12  }, // 4 },
		  {data: 'Type' , type: 'numeric', format: '0'},  //, width: 14
		  {data: 'Info'  , renderer: "html"},  // , width: 1
		  {data: 'Comment'  , type: 'text'}
		] 
        , autoWrapRow: false ///true
        , manualRowResize: true,
         manualColumnResize: true,
         contextMenu: ['row_above', 'row_below', 'remove_row','undo', 'redo','commentsAddEdit'],
		 comments: true,  //TODO: comment does not work, 
		 cell: [
		      {row: 0, col: 0, comment: 'You can paste youtube Id or links to this column'}
			, {row: daPL.length-1, col: 0, comment: 'You can paste youtube Id or links to this cell'}
			, {row: daPL.length-1, col: 1, comment: 'You can paste youtube Id or links to this cell'}
		 ]
	    , afterRender: function(){ fillPlaylistsDict(); evData_Filled= fillEvs(); 

// cl('htPL.afterRender()')
//	    	dbVid.store('dbVid'); dbPL.store('dbPL'); cl('afterRender: dbVid.store(); dbPL.store()', dbPL()) 
	    	}
       // , afterRender : createCanvas // function(){positionCanvas('htPL afterRender');  }
//nOK zzz        , afterRender : htEv.loadData(daEv) //updateSettings()  // // function(){positionCanvas('htPL afterRender');  }

        , afterChange: function(changes, source) {
        	//if(changes) if(1 || source === 'alter'){
            if(changes) if(source === 'alter'){
            	for(var i=0, l= changes.length; i<l; i++){
        			// console.log(changes)
        			var yid= changes[i][3].replace(/.*watch.v=/, '').replace(/&.*/, '')
        			var hlink= '<a href="https://www.youtube.com/watch?v=%s" target="_blank">%s</a>'.sf(yid, yid)

        			var ro= changes[i][0], th= this;

        			daPL[ro].YTId= yid
        			//htPL.setDataAtCell(ro, 1, yid);
        			
        			$.ajax({
        	            url: 'http://query.yahooapis.com/v1/public/yql',
        	                data: {
        	                	
// http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=iTc9QclQ_l0&format=json
// {"thumbnail_url": "https:\/\/i.ytimg.com\/vi\/iTc9QclQ_l0\/hqdefault.jpg"
//	, "title": "[FUN]CARVING Passo Tonale 2012"
//	, "author_url": "https:\/\/www.youtube.com\/user\/MarshallCZE"
//	, "author_name": "Luk\u00e1\u0161 Mar\u0161\u00edk"
//	, "html": "\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/iTc9QclQ_l0?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e"

        	                	
        	                	
        	                	q: "select * from json where url ='http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v="+ yid + "&format=json'",
        	                    format: "json"
        	                },
        	                dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
        		    	  , success: function(result){
        		    		  var rj= result.query.results.json
        		    		  console.log('afterChange ajax result=', rj)
        		    		  var tit= rj.title;
        		    		  console.log('afterChange ajax tit=', tit)
        		    		  //daPL[changes[i][0]].Info= result.getElementsByTagName("title");
        		    		  daPL[ro].Info= note(infoRich, rj);
        		    		  //th.render();
        		    		  th.setDataAtCell(ro, 1, yid); // hlink);
        		    		 // th.setDataAtCell(ro, 3, '%s, by %s'.sf(tit, result.query.results.json.author_name));
         		    		  th.setDataAtCell(ro, 3, note(infoRich, rj));
       		    	  }});
        		}
        		//this.render();
        	}
        	
        }
	  });  

	  
	  htEv= new Handsontable($("#tbEventsH")[0], {
	  		data: daEv,  //dbEv().get(), //
	  		minSpareRows: 1,
	  		//minRows: daEv.length, //200, //
	  		height: 196,
	  		//colHeaders: 'Video1 t1 Video2 t2 Phase SSI BM TD img'.split(" "),
	  		colHeaders: 'Video1 t1 Video2 t2 Phase SSI BM TD'.split(" "),

	  		rowHeaders: true,
	  		stretchH: 'all',
	  		columnSorting: true,
	  		contextMenu: true,
	  	    manualRowResize: true,
	  	    manualColumnResize: true,
	  		
	  	    currentRowClassName: 'currentRow',
	  	    currentColClassName: 'currentCol',
	  	    
	  		//className: "htCenter htMiddle",
	  		readOnly: false,
	  		columns: [
	  	//	  {data: 'Index' , type: 'numeric', format: '0'}, // width: 13},
	  		  {data: 'Video1' , type: 'text' , renderer: Video_Renderer1
	  //zzz			  , editor: 'select'
//	  			  , selectOptions: daPL.filter(function(p){return p.Type==1}) .map(function(i){return i['Id']})
	  			}, //, width: 20}, 
	  		  {data: 't1' , type: 'numeric', format: '0.00'},  // renderer: function(){alert("ttt")}}, //, width: 14},
//	  		  {data: 'Video2', renderer: function(){alert("zzz")} //Video_Renderer1   , type: 'text'
	  		  {data: 'Video2' , type: 'text', renderer: Video_Renderer1  
	  //zzz			  , editor: 'select'
//	  			  , selectOptions: daPL.filter(function(p){return p.Type==2}) .map(function(i){return i.Id})
	  			}, //, width: 20}, 
	  		  {data: 't2' , type: 'numeric', format: '0.00'}, //, width: 14},
	  		  {data: 'Phase'  , type: 'text'},
	  		  {data: 'SSI'  , type: 'text'},
	  		  {data: 'BM'  , type: 'text', renderer: "html"}, // renderer: "html" for Phases 
	  		  {data: 'TD'  , type: 'text'}
//	  		, {data: 'img'  }  // , renderer: imgRenderer}

	  		 ] //,     minSpareRows: 1
	  		, comments: true,
	  		 cell: [
	  			  {row: daEv.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
	  			, {row: daEv.length, col: 2, comment: 'You can paste youtube Id or links to this cell'}
	  		 ]
	           , autoWrapRow: true
	           
	       //   , afterRender : function(){positionCanvas('htEv afterRender');  }
	           , afterRender : function(){evData_Filled= fillEvs()}
	  	  });	

	  var unP= uniq_dbPhases()
	  cl('uniq_dbPhases=', unP )
	  if(1){
	  	dbPhases= unP;
	  	localStorage.removeItem('taffy_' + "dbPhases");
	  	dbPhases.store("dbPhases")
	  	//dbPhases.store("dbPhases")
	  	console.log('dbPhases = ', dbPhases().get())
	  }

	 setTimeout(LoadPlaylists, 3000)


//}) /////////////////////////////////////////////////////////////////

	  
	  var zz;
	  
	  function test(){ alert('test')
		//  $.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json", function(data) {
			$.getJSON("http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x")

	  }



var	x= function(data) {
		  //first row "title" column
//			  console.log(data.feed.entry[0]['gsx$title']['$t']);
//			  zz= data.feed;
			  
			  zz= data;
		      console.log('zz=', zz)
		};
/*
 * 
 * setTimeout(function(){p.pauseVideo()}, 1000); p.nextVideo().nextVideo().seekTo(5);
 * 
 * 
 * http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x
 * 
 * https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/pubhtml
 * 
 * http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x

 * */


