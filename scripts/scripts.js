'use strict';angular.module('axisJSApp',['ngAnimate','ngResource','ngSanitize','ui.router','ui.bootstrap','minicolors','ngAside','ngHandsontable','LocalStorageModule']).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise('/'),a.state('index',{url:'/',templateUrl:'partials/main.html',controller:'MainCtrl',resolve:{appConfig:["configProvider","$rootScope",function(a,b){return b.version='1.0.3',a}]}})}]),angular.module('axisJSApp').controller('HeadCtrl',['configProvider','$scope',function(a,b){a.then(function(a){b.conf=a,b.stylesheet='undefined'!=typeof a.stylesheet?a.stylesheet:'',b.fonts='undefined'!=typeof a.fonts?a.fonts:[]})}]),angular.module('axisJSApp').controller('MainCtrl',["$scope","$injector","$window","appConfig","chartProvider","inputService","configChooser",function(a,b,c,d,e,f,g){var h=f(d),i=e(d);a.inputs={},a.columns=[],a.chartData={},a.appConfig=d,a.config=i.config,a.chartTypes=i.chartTypes,a.axesConfig=i.axesConfig,a.config.background=d.background?d.background:!1,a.config.backgroundColor=d.backgroundColor?d.backgroundColor:'white',a.toggleChooser=function(){g()},a.updateData=function(){return h.input(a)},a.validateData=function(a){return h.validate(a)},a.setGlobalType=function(b){i.setGlobalType(b,a)},a.setGroups=function(){i.setGroups(a)},c.getConfig=function(){console.dir(a),c.chartConfig=a.config},angular.forEach(d["export"],function(c){var d,e=b.get(c.toLowerCase().replace(' ','')+'Output');'undefined'!=typeof e["import"]&&(d=e["import"](h),d&&(a.inputs.inputData=d.inputData,a.config=d.config))}),a.inputs.inputData||(a.inputs.inputData=h.defaultData),a.updateData()}]),angular.module('axisJSApp').directive('buildChart',["chartProvider","$timeout","$window",function(a,b,c){return{restrict:'A',link:function(d,e){function f(){var a,b,c,e,f=d3.select('svg'),g=f.attr('width');null!==f.select('text.titles')[0][0]?(a=f.select('text.titles'),b=a.select('tspan.chartTitle'),c=a.select('tspan.chartCredit'),e=a.select('tspan.chartSource')):(a=f.insert('text').attr('class','titles').attr('text-anchor',d.appConfig.titles.align),b=a.insert('tspan').attr('class','chartTitle'),c=a.insert('tspan').attr('class','chartCredit'),e=a.insert('tspan').attr('class','chartSource')),b.text(d.config.chartTitle).attr('font-size',d.appConfig.titles['title size']),c.text(d.config.chartCredit).attr('font-size',d.appConfig.titles['credit size']);var h=(d.appConfig.titles['append source']&&d.config.chartSource?'Source: ':'')+d.config.chartSource;e.text(h).attr({'font-size':d.appConfig.titles['source size'],'font-style':d.appConfig.titles['source style']});var i='undefined'!=typeof d.appConfig.titles['title translateY']?d.appConfig.titles['title translateY']:0;b.attr({dy:i,x:0});var j='undefined'!=typeof d.appConfig.titles['credit translateY']?d.appConfig.titles['credit translateY']:32;c.attr({dy:j,x:0});var k='undefined'!=typeof d.appConfig.titles['source translateY']?d.appConfig.titles['source translateY']:30;for(e.attr({dy:k,x:0});b.node().getComputedTextLength()>g||c.node().getComputedTextLength()>g||e.node().getComputedTextLength()>g;){var l=parseInt(b.attr('font-size').replace('px',''))-1,m=parseInt(c.attr('font-size').replace('px',''))-1,n=parseInt(e.attr('font-size').replace('px',''))-1;b.attr('font-size',l+'px'),c.attr('font-size',m+'px'),e.attr('font-size',n+'px'),c.attr({dy:l,x:0}),e.attr({dy:m,x:0})}if(d.appConfig.titles['title background']&&b.text().length>0){b.attr('fill','white');var o=b.node().getBBox(),p=d.appConfig.titles['background padding'],q=d3.select(b.node().parentNode.parentNode).insert('rect','text.titles');q.attr('x',0).attr('y',0).attr('class','title-background').attr('width',o.width+2*p).attr('height',18+2*p).style('fill',d.config.data.colors[d.config.data.columns[0][0]]),b.attr({x:0+p,dy:i+p})}var r='undefined'!=typeof d.appConfig.titles.translateX?d.appConfig.titles.translateX:g/2,s='undefined'!=typeof d.appConfig.titles.translateY?d.appConfig.titles.translateY:350;a.attr('width',g).attr('transform','translate('+r+','+s+')'),f.attr('height',f.node().getBBox().height+'px')}function g(){d.config.size={width:angular.element('.rendering').width()-20,height:angular.element(window).height()-50},d.config.chartWidth=d.config.size.width,d.config.chartHeight=d.config.size.height,h=a(d.appConfig).generate(e[0].id,d.config),b(function(){f()})}e.children('svg').attr('transform','scale(2)');var h;g(),d.$watch('config.data.columns',function(a){g(),d.config.data.colors={},'object'==typeof d.config.data.types?angular.forEach(d.config.data.types,function(b,c){for(var e=0;e<a.length;e++)if(a[e][0]===c)return;delete d.config.data.types[c]}):d.config.data.types={},d.config.data.axes={},angular.forEach(d.columns,function(a){d.config.data.axes[a]||(d.config.data.axes[a]=d.appConfig.defaults['y axis']?d.appConfig.defaults['y axis']:'y'),d.config.data.colors[a]=h.data.colors()[a],'series'===d.config.chartGlobalType?d.config.data.types[a]||(d.config.data.types[a]='line'):d.config.data.types[a]=d.config.chartGlobalType})},!0),d.$watch('config.data.colors',function(){h.data.colors(d.config.data.colors)},!0),d.$watch('config.data.types',function(){g()},!0),d.$watch('config.axis',function(a){for(var b in a)if(a.hasOwnProperty(b)){if(a[b].hasOwnProperty('label')){var c={};c[b]=a[b].label,h.axis.labels(c)}(a[b].hasOwnProperty('show')||a[b].hasOwnProperty('max')||a[b].hasOwnProperty('min'))&&g(),(a[b].hasOwnProperty('prefix')||a[b].hasOwnProperty('suffix')||a[b].hasOwnProperty('accuracy'))&&('undefined'==typeof a[b].prefix?d.config.axis[b].prefix='':d.config.axis[b].prefix=a[b].prefix,'undefined'==typeof a[b].suffix?d.config.axis[b].suffix='':d.config.axis[b].suffix=a[b].suffix,'undefined'==typeof a[b].accuracy?d.config.axis[b].accuracy=0:d.config.axis[b].accuracy=a[b].accuracy)}},!0),d.$watchGroup(['config.data.x','config.data.y','config.data.y2'],function(a){a.forEach(function(a,b){var c=0===b?'x':1===b?'y':2===b?'y2':'';d.config.data.columns.forEach(function(b){for(var e=1;e<b.length;e++){if(isNaN(b[e])&&b[0]===a){d.config.axis[c].type='category',d.config.axis[c].tick=void 0;break}b[0]===a&&(d.config.data.axes[a]=c)}})}),g()}),d.$watchGroup(['config.chartTitle','config.chartCredit','config.chartSource','config.chartAccuracy','config.legend.position','config.legend.show'],function(){g()}),d.$watch('config.data.groups',function(){g()},!0),d.$watch('config.background',function(a){a===!0?d3.select('svg').insert('rect',':first-child').attr('class','chart-bg').attr('width','100%').attr('height','100%').attr('fill',d.config.backgroundColor):d3.select('.chart-bg').remove()}),angular.element(c).bind('resize',function(){g()})}}}]),angular.module('axisJSApp').directive('exportChart',['outputService',function(a){return{restrict:'A',link:function(b,c,d){c.on('click',function(){f(b.config.chartWidth),'save'!==d.exportChart&&a(b,d.exportChart)});var e,f=function(a){angular.element('defs').remove(),g();var c=angular.element('#canvas').empty()[0];if(a){var d=a/angular.element('#chart').width();angular.element('#chart > svg').attr('transform','scale('+d+')'),c.width=angular.element('#chart > svg').width()*d,c.height=angular.element('#chart > svg').height()*d}else angular.element('#chart > svg').attr('transform','scale(2)'),c.width=2*angular.element('#chart > svg').width(),c.height=2*angular.element('#chart > svg').height();var e=c.getContext('2d'),f=document.getElementsByTagName('svg')[0],h=new XMLSerializer;f=h.serializeToString(f),e.drawSvg(f,0,0);for(var j=[],k=0;k<b.columns.length;k++)j.push(b.columns[k]);b.chartTitle&&j.unshift(b.chartTitle),j=j.join('-').replace(/[^\w\d]+/gi,'-'),angular.element('.savePNG').attr('href',c.toDataURL('png')).attr('download',function(){return j+'_axisJS.png'});var l=i(angular.element('#chart > svg')[0]);$('.saveSVG').attr('href','data:text/svg,'+l.source[0]).attr('download',function(){return j+'_axisJS.svg'})},g=function(){for(var a,b,c=0;c<=document.styleSheets.length-1;c++)document.styleSheets[c].href&&-1!==document.styleSheets[c].href.indexOf('c3.css')&&(a=void 0!==document.styleSheets[c].rules?document.styleSheets[c].rules:document.styleSheets[c].cssRules);if(null!==a&&void 0!==a){var d=function(){('hidden'===angular.element(this).css('visibility')||'0'===angular.element(this).css('opacity'))&&angular.element(this).css('display','none')};for(c=0;c<a.length;c++)1===a[c].type&&(b=a[c].selectorText,e=h(a[c]),angular.element('svg *').each(d),angular.element(b).not('.c3-chart path').css(e)),angular.element('.c3-chart path').filter(function(){return'none'===angular.element(this).css('fill')}).attr('fill','none'),angular.element('.c3-chart path').filter(function(){return'none'!==angular.element(this).css('fill')}).attr('fill',function(){return angular.element(this).css('fill')})}},h=function(a){var b,c=a.style,d={};for(b=0;b<c.length;b++)d[c[b]]=c[c[b]];return d},i=function(a){var b={xmlns:'http://www.w3.org/2000/xmlns/',xlink:'http://www.w3.org/1999/xlink',svg:'http://www.w3.org/2000/svg'},c='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';a.setAttribute('version','1.1');var d=document.createElement('style');d.setAttribute('type','text/css'),a.removeAttribute('xmlns'),a.removeAttribute('xlink'),a.hasAttributeNS(b.xmlns,'xmlns')||a.setAttributeNS(b.xmlns,'xmlns',b.svg),a.hasAttributeNS(b.xmlns,'xmlns:xlink')||a.setAttributeNS(b.xmlns,'xmlns:xlink',b.xlink);var f=(new XMLSerializer).serializeToString(a).replace('</style>','<![CDATA['+e+']]></style>');return f=f.replace(/\sfont-.*?: .*?;/gi,''),f=f.replace(/\sclip-.*?="url\(http:\/\/.*?\)"/gi,''),f=f.replace(/\stransform="scale\(2\)"/gi,''),f=f.replace(/<defs xmlns="http:\/\/www.w3.org\/1999\/xhtml">/gi,'<defs>'),{svg:a,source:[c+f]}}}}}]),angular.module('axisJSApp').directive('addColors',['$timeout',function(a){return{restrict:'A',link:function(b,c){a(function(){c.children('option').each(function(){var a=angular.element(this);a.attr('data-color',a.text())}),c.colorselector()},500)}}}]),angular.module('axisJSApp').directive('maintainFocus',function(){return{restrict:'A',link:function(a,b){b.on('keydown',function(a){if(9===a.keyCode){var b=this.value,c=this.selectionStart,d=this.selectionEnd;return this.value=b.substring(0,c)+'	'+b.substring(d),this.selectionStart=this.selectionEnd=c+1,!1}})}}}),angular.module('axisJSApp').factory('configChooser',["$aside",function(a){return function(){a.open({placement:'right',backdrop:!0,controller:["$scope","localStorageService","$window","configProvider","$modalInstance",function(a,b,c,d,e){this.name='Choose Configuration',a.themes=[],d.then(function(b){a.themes=b.themes}),a.cancel=function(a){e.dismiss(),a.stopPropagation()},a.setConfig=function(a){b.set('config',a),c.location.reload()}}],templateUrl:'partials/configChooser.html'})}}]),angular.module('axisJSApp').provider('configProvider',function(){return{$get:["$http","$q","localStorageService",function(a,b,c){var d=a.get('default.config.yaml'),e=c.get('config')?c.get('config'):'config.yaml',f=a.get(e).then(function(a){return a.data},function(a){return 404===a.status?(a.data={},a):b.reject(a)});return b.all([d,f]).then(function(a){var b=jsyaml.safeLoad(a[0].data),c=jsyaml.safeLoad(a[1]);return c='undefined'!==c?c:{},angular.extend(b,c)})}]}}),angular.module('axisJSApp').factory('GenericOutput',[function(){return this.serviceConfig={type:'save',label:''},this.preprocess=function(a){return a},this.process=function(a){return a},this.complete=function(a){return a},this["export"]=function(a){var b=this.preprocess(a),c=this.process(b);return this.complete(c)},this}]),angular.module('axisJSApp').factory('wordpressOutput',["GenericOutput","$http","$window",function(a,b,c){var d=angular.copy(a);return d.serviceConfig={type:'export',label:'Save to WordPress'},d.preprocess=function(a){var b=angular.copy(a.config);b.axis.x.tick.format=b.axis.x.tick.format.toString(),b.axis.y.tick.format=b.axis.y.tick.format.toString(),b.axis.y2.tick.format=b.axis.y2.tick.format.toString(),b.pie.label.format=b.pie.label.format.toString(),b.donut.label.format=b.donut.label.format.toString(),b.gauge.label.format=b.gauge.label.format.toString();var c=String(angular.toJson(b)),d=String(angular.element('.savePNG').attr('href')),e=parent.tinymce.activeEditor.windowManager.getParams().axisWP;return{action:'insert_axis_attachment',axisConfig:c,axisChart:d,parentID:e.parentID}},d.process=function(a){b.post(parent.ajaxurl,a,{headers:{'Content-Type':'application/x-www-form-urlencoded'},transformRequest:function(a){var b=[];for(var c in a)if(a[c]instanceof Array)for(var d in a[c]){var e=a[c][d];for(var f in e)b.push(encodeURIComponent(c)+'['+d+']['+encodeURIComponent(f)+']='+encodeURIComponent(e[f]))}else b.push(encodeURIComponent(c)+'='+encodeURIComponent(a[c]));return b.join('&')}}).success(function(a){a=angular.fromJson(a),parent.tinymce.activeEditor.insertContent('<div class="mceNonEditable"><img width="100%" src="'+a.attachmentURL+'?'+(new Date).getTime()+'" data-axisjs=\''+window.btoa(angular.toJson(a))+'\' class="mceItem axisChart" /></div><br />'),parent.tinymce.activeEditor.windowManager.close()}).error(function(a,b,c,d){console.dir([a,b,c,d])})},d["export"]=function(a){var b=d.preprocess(a);d.process(b),d.complete()},d["import"]=function(a){if('undefined'!=typeof parent.tinymce&&'undefined'!=typeof parent.tinymce.activeEditor.windowManager.getParams().axisJS){var b={};if(b.config=angular.fromJson(c.atob(parent.tinymce.activeEditor.windowManager.getParams().axisJS)),b.inputData=a.convert(b.config.data.columns),b.config.axis.x.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.x.type?b.config.axis.x.prefix+a.toFixed(b.config.axis.x.accuracy).toString()+b.config.axis.x.suffix:a},b.config.axis.y.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.y.type?b.config.axis.y.prefix+a.toFixed(b.config.axis.y.accuracy).toString()+b.config.axis.y.suffix:a},b.config.axis.y2.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.y2.type?b.config.axis.y2.prefix+a.toFixed(b.config.axis.y2.accuracy).toString()+b.config.axis.y2.suffix:a},b.config.donut.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config.pie.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config.gauge.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config&&b.inputData)return b}},d}]),angular.module('axisJSApp').service('outputService',["configProvider","$injector",function(a,b){return function(a,c){var d=b.get(c+'Output');return d["export"](a)}}]),angular.module('axisJSApp').service('chartProvider',['$injector',function(a){return function(b){var c=a.get(b.framework+'Service'),d=c.getConfig(b);return d.generate=c.generate,d}}]),angular.module('axisJSApp').factory('c3Service',function(){return{generate:function(a,b){var c=angular.extend({bindto:'#'+a},b);return c3.generate(c)},getConfig:function(a){var b=[];angular.forEach(a.colors,function(a){b.push(a.value)});var c={data:{x:'',y:'',y2:'',columns:[['data1',30,200,100,400,150,250],['data2',50,20,10,40,15,25]],axes:{data1:a.defaults['y axis'],data2:a.defaults['y axis']},groups:{},type:'',types:{data1:'line',data2:'line'},colors:{data1:a.colors[0].value,data2:a.colors[1].value}},grid:{x:{show:'undefined'!=typeof a.defaults['grid x']?a.defaults['grid x']:!1},y:{show:'undefined'!=typeof a.defaults['grid y']?a.defaults['grid y']:!1}},axis:{x:{show:'undefined'!=typeof a.defaults['axis x']?a.defaults['axis x']:!0},y:{show:'undefined'!=typeof a.defaults['axis y']?a.defaults['axis y']:!0},y2:{show:'undefined'!=typeof a.defaults['axis y2']?a.defaults['axis y2']:!1}},point:{show:'undefined'!=typeof a.defaults.point?a.defaults.point:!1},legend:{position:'undefined'!=typeof a.defaults['legend position']?a.defaults['legend position']:'bottom',show:'undefined'!=typeof a.defaults.legend?a.defaults.legend:!0},color:{pattern:b}},d=['line','step','area','area-step','scatter','bar','spline'],e=[{value:'x',label:'Bottom'},{value:'y',label:'Left'},{value:'y2',label:'Right'}];return c.groups={},c.axis.x.accuracy=0,c.axis.y.accuracy=0,c.axis.y2.accuracy=0,c.axis.x.prefix='',c.axis.y.prefix='',c.axis.y2.prefix='',c.axis.x.suffix='',c.axis.y.suffix='',c.axis.y2.suffix='',c.axis.x.tick={format:function(a){return'series'===c.chartGlobalType&&'category'!==c.axis.x.type?c.axis.x.prefix+a.toFixed(c.axis.x.accuracy).toString()+c.axis.x.suffix:a}},c.axis.y.tick={format:function(a){return'series'===c.chartGlobalType&&'category'!==c.axis.y.type?c.axis.y.prefix+a.toFixed(c.axis.y.accuracy).toString()+c.axis.y.suffix:a}},c.axis.y2.tick={format:function(a){return'series'===c.chartGlobalType&&'category'!==c.axis.y2.type?c.axis.y2.prefix+a.toFixed(c.axis.y2.accuracy).toString()+c.axis.y2.suffix:a}},c.chartTitle='',c.chartCredit='',c.chartSource='',c.chartWidth=1e3,c.chartHeight=500,c.chartGlobalType='series',c.chartAccuracy=1,c.cms='undefined'!=typeof parent.tinymce?!0:!1,c.pie={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+'%'}}},c.donut={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+'%'}}},c.gauge={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+'%'}}},{config:c,chartTypes:d,axesConfig:e,dependencies:this.getExternalDependencies(),setGlobalType:this.setGlobalType,setGroups:this.setGroups}},getExternalDependencies:function(){return{css:['//cdnjs.cloudflare.com/ajax/libs/c3/0.4.7/c3.min.css'],js:['//cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js','//cdnjs.cloudflare.com/ajax/libs/c3/0.4.7/c3.min.js']}},setGlobalType:function(a,b){for(var c in b.config.data.types)b.config.data.types.hasOwnProperty(c)&&('series'!==a?b.config.data.types[c]=a:b.config.data.types[c]='line')},setGroups:function(a){a.config.data.groups=[];for(var b in a.config.groups)a.config.groups.hasOwnProperty(b)&&('undefined'==typeof a.config.data.groups[a.config.groups[b]]&&(a.config.data.groups[a.config.groups[b]]=[]),a.config.data.groups[a.config.groups[b]].push(b))}}}),angular.module('axisJSApp').service('inputService',["configProvider","$injector",function(a,b){return function(a){return b.get(a.input+'Input')}}]),angular.module('axisJSApp').factory('csvInput',function(){var a=function(a){var b={header:!0};a.match('	')&&(b.delimiter='	');var c=Papa.parse(a,b),d=/^[^,\t\s]*\n[^,\t\s]*$/gm;return c.errors.length>0&&!a.match(d)?!1:!0},b='data1	data2\n30	50\n200	20\n100	10\n400	40\n150	15\n250	25',c=function(a){if(a.inputs.inputData){a.chartData=[],a.columns=[],a.config.data.columns=[];var b={header:!0};a.inputs.inputData.match('	')&&(b.delimiter='	'),a.chartData=Papa.parse(a.inputs.inputData,b).data,a.chartData.length>0&&(a.columns=Object.keys(a.chartData[0]),angular.forEach(a.columns,function(b){var c=[];c.push(b),angular.forEach(a.chartData,function(a){c.push(a[b])}),a.config.data.columns.push(c)}))}return a},d=function(a){for(var b=[],c=[],d=0;d<a.length;d++){c.push(a[d].shift());for(var e=0;e<a[d].length;e++)b[e]||(b[e]=[]),b[e][d]=a[d][e]}return Papa.unparse({fields:c,data:b},{delimiter:'	'})};return{validate:function(b){return a(b)},defaultData:b,input:function(a){return c(a)},convert:function(a){return d(a)}}}),angular.module('axisJSApp').factory('spreadsheetInput',function(){var a=[['data1','data2'],[30,50],[200,20],[100,10],[400,40],[150,15],[250,25]],b=function(a){if(a.inputs.inputData){a.chartData=[],a.columns=[],a.config.data.columns=[],a.chartData=angular.copy(a.inputs.inputData);var b=[];a.chartData.length>0&&(a.columns=a.chartData[0].filter(function(a){return void 0!=a}),a.chartData.shift(),angular.forEach(a.columns,function(c,d){var e=[];e.push(c),angular.forEach(a.chartData,function(a){null!==a[d]&&e.push(a[d])}),b.push(e)}),a.config.data.columns=b)}return a},c=function(a){for(var b=[],c=[],d=0;d<a.length;d++){c.push(a[d].shift());for(var e=0;e<a[d].length;e++)b[e]||(b[e]=[]),b[e][d]=a[d][e]}return[c].concat(b)};return{validate:function(a){return a instanceof Array},defaultData:a,input:function(a){return b(a)},convert:function(a){return c(a)}}}),angular.module('axisJSApp').factory('embedcodeOutput',['GenericOutput','chartProvider','$modal',function(a,b,c){var d=angular.copy(a);return d.serviceConfig={type:'export',label:'Generate embed code'},d.preprocess=function(a){var c=angular.copy(a.config);return c.bindto='#chart-'+Math.floor(1e4*Math.random()+1),{config:c,dependencies:b(a.appConfig).dependencies}},d.process=function(a){var b={},c=[],d=[],e=JSONfn.stringify(a.config);return c.push('<div id="'+a.config.bindto.replace('#','')+'"></div>'),angular.forEach(a.dependencies.css,function(a){c.push('<link rel="stylesheet" href="'+a+'" />')}),angular.forEach(a.dependencies.js,function(a){c.push('<script src="'+a+'"></script>')}),d.push('<script type="text/javascript">(function(){','var configJSON = '+e+';','var fixJson = function(obj){for(var i in obj)obj.hasOwnProperty(i)&&("string"==typeof obj[i]&&obj[i].match(/^function/)?obj[i]=eval("("+obj[i]+")"):"object"==typeof obj[i]&&fixJson(obj[i]));return obj};','var config = fixJson(configJSON);','c3.generate(config);','})();</script>'),b.complete=c.concat(d).join('\n'),b.partial=[c[0]].concat(d).join('\n'),b},d.complete=function(a){c.open({templateUrl:'partials/outputModal.html',controller:["$scope",function(b){b.includeDeps=!0,b.output=b.includeDeps?a.complete:a.partial,b.updateOutput=function(c){c?b.output=a.complete:b.output=a.partial}}]})},d}]),angular.module('axisJSApp').service('pdfOutput',["GenericOutput",function(a){var b=angular.copy(a);return b.preprocess=function(a){return{data:document.getElementById('canvas').toDataURL(),margins:a.appConfig['print margins']?a.appConfig['print margins']:void 0}},b.process=function(a){var b=new jsPDF('l','pt');return b.addImage(a.data,'PNG',0,0),b},b.complete=function(a){a.save('axis.pdf')},b}]),angular.module('axisJSApp').directive('saveButton',function(){return{templateUrl:'partials/saveButton.html',scope:!0,link:function(a,b,c){a.buttonType=c.type,a.items='export'===c.type?a.appConfig["export"]:a.appConfig.save}}}),angular.module('axisJSApp').factory('axisOutput',["GenericOutput",function(a){var b=angular.copy(a);return b.serviceConfig={type:'export',label:'Save'},b.preprocess=function(a){var b=a.config;b.axis.x.tick.format=b.axis.x.tick.format.toString(),b.axis.y.tick.format=b.axis.y.tick.format.toString(),b.axis.y2.tick.format=b.axis.y2.tick.format.toString(),b.pie.label.format=b.pie.label.format.toString(),b.donut.label.format=b.donut.label.format.toString(),b.gauge.label.format=b.gauge.label.format.toString();var c=b.chartTitle,d=String(angular.toJson(b)),e=String(angular.element('.savePNG').attr('href'));return{config:d,png:e,title:c}},b.process=function(a){window.parent.postMessage(JSON.stringify(a),'*')},b.complete=function(){console.log('Complete.')},b["export"]=function(a){var c=b.preprocess(a);b.process(c),b.complete()},b["import"]=function(a){if('undefined'!=typeof parent.axisConfig){var b={};if(b.config=angular.fromJson(parent.axisConfig),b.inputData=a.convert(b.config.data.columns),b.config.axis.x.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.x.type?b.config.axis.x.prefix+a.toFixed(b.config.axis.x.accuracy).toString()+b.config.axis.x.suffix:a},b.config.axis.y.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.y.type?b.config.axis.y.prefix+a.toFixed(b.config.axis.y.accuracy).toString()+b.config.axis.y.suffix:a},b.config.axis.y2.tick.format=function(a){return'series'===b.config.chartGlobalType&&'category'!==b.config.axis.y2.type?b.config.axis.y2.prefix+a.toFixed(b.config.axis.y2.accuracy).toString()+b.config.axis.y2.suffix:a},b.config.donut.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config.pie.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config.gauge.label.format=function(a,c){return(100*c).toFixed(b.config.chartAccuracy)+'%'},b.config&&b.inputData)return b}},b}]);