(this.webpackJsonpstocks_front=this.webpackJsonpstocks_front||[]).push([[0],{167:function(e,t,a){e.exports=a.p+"static/media/Githublogo.ce89173e.svg"},200:function(e,t,a){e.exports=a(408)},205:function(e,t,a){},222:function(e,t,a){},402:function(e,t,a){},403:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(62),c=a.n(r),o=a(21),l=a(22),i=a(24),u=a(23),m=a(25),k=(a(205),a(157)),g=a.n(k),h=(a(222),a(95)),d=a(27),f=(a(402),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.chartValues.map((function(e){return Number(e.value)})),t=Math.max.apply(Math,Object(h.a)(e)),a=Math.min.apply(Math,Object(h.a)(e));return a>>=0,t=Math.ceil(t),s.a.createElement(s.a.Fragment,null,s.a.createElement(d.d,{width:"60%",className:"Chart"},s.a.createElement(d.c,{data:this.props.chartValues,margin:{top:15,right:40,left:-15,bottom:15}},s.a.createElement(d.a,{vertical:!1,stroke:"#ebf3f0"}),s.a.createElement(d.f,{dataKey:"date",stroke:"black"}),s.a.createElement(d.g,{domain:[a,t],stroke:"black"}),s.a.createElement(d.e,null),s.a.createElement(d.b,{dataKey:"value",stroke:"#8984d8",dot:!1,strokeWidth:"0.5%"}))))}}]),t}(n.Component)),p=(a(403),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onTextChanged=function(e){var t=a.props.items,n=e.target.value,s=[];if(n.length>0){var r=new RegExp("^".concat(n),"i");s=t.sort().filter((function(e){return r.test(e)}))}a.setState((function(){return{suggestions:s,text:n}}))},a.state={suggestions:[],text:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"suggestionSelected",value:function(e){this.setState((function(){return{text:"",suggestions:[]}})),this.props.callbackFromApp(e)}},{key:"renderSuggestions",value:function(){var e=this,t=this.state.suggestions;return 0===t.length?null:s.a.createElement("ul",null,t.map((function(t){return s.a.createElement("li",{key:t,onClick:function(){return e.suggestionSelected(t)}}," ",t," ")})))}},{key:"render",value:function(){var e=this.state.text;return s.a.createElement("div",{className:"AutoCompleteText"},s.a.createElement("input",{value:e,onChange:this.onTextChanged,type:"text"}),this.renderSuggestions())}}]),t}(s.a.Component)),S=a(168),v=a.n(S),b=a(420),E=a(167),L=a.n(E),O=function(e,t){return((e-t)/t*100).toFixed(2)},N="https://osakeseuranta.net",j=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).getStockFromSearchBar=function(e){var t=a.state.stockListFromApi.find((function(t){return t.name===e}));if(0!==JSON.parse(t.values).length)if(a.state.stockList.find((function(e){return e.symbol===t.symbol})))alert("".concat(t.name," on jo listalla. Valitse toinen osake."));else{var n=a.state.stockList;n.push(t),localStorage.setItem("stockList",JSON.stringify(n)),a.handleStockChange(t.id),a.setState({stockList:n})}else alert("Valitettavasti osakkeen tiedoissa on ongelma. Kokeile jotain toista osaketta.")},a.handleDelete=function(e){var t=a.state.stockList.indexOf(e),n=a.state.stockList;n.splice(t,1),localStorage.setItem("stockList",JSON.stringify(n)),a.setState({stockList:n})},a.handleStockChange=function(e){var t=a.state.stockListFromApi.find((function(t){return t.id===e})),n=JSON.parse(t.values),s=n[n.length-1].value,r=n[0].value,c=O(s,r);c+="%",a.setState({values:n,currentStockChange:c,currentStock:t.name})},a.setStartStock=function(e){var t=e[0],n=JSON.parse(t.values),s=n[n.length-1].value,r=n[0].value,c=O(s,r);c+="%";var o=t.name;a.setState({values:n,currentStockChange:c,currentStock:o})},a.refreshLocalStorage=function(e,t){if(JSON.parse(t[0].values)[0].date!==JSON.parse(e[0].values)[0].date){for(var n=function(a){var n=t.find((function(t){return t.id===e[a].id}));e[a].values=n.values},s=0;s<e.length;s++)n(s);localStorage.setItem("stockList",JSON.stringify(e))}a.setState({stockList:e,isLoading:!1}),console.log(a.state.isLoading),a.setStartStock(e)},a.componentDidMount=function(){var e=JSON.parse(localStorage.getItem("stockList"));console.log(e),null!==e&&0!==e.length||a.setState({isLoading:!1});var t="".concat(N,"/api");g.a.get(t).then((function(t){null!==e&&0!==e.length&&a.refreshLocalStorage(e,t.data),a.setState({stockListFromApi:t.data})}))},a.renderStockList=function(){return 0===a.state.stockList.length||0===a.state.stockList?null:s.a.createElement("ul",null,a.state.stockList.map((function(e){return s.a.createElement("li",{key:e.id}," ",s.a.createElement("button",{className:"Listobject",onClick:function(){return a.handleStockChange(e.id)}}," ",e.name," ")," ",s.a.createElement(v.a,{onClick:function(){return a.handleDelete(e)},className:"Deletebutton"})," ")})))},a.renderMain=function(){return 0!==a.state.stockList.length&&!1===a.state.isLoading?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"Headers"},s.a.createElement("p",{className:"Stockheader"}," ",a.state.currentStock," "),s.a.createElement("p",{className:"Stockpercentage",style:{color:Number(a.state.currentStockChange.substring(0,a.state.currentStockChange.length-1))>=0?"green":"red"}}," ",a.state.currentStockChange," ")),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"Container"},s.a.createElement("div",{className:"Stocklist"},a.renderStockList()),s.a.createElement(f,{chartValues:a.state.values})),s.a.createElement("div",{className:"Addstock"},s.a.createElement("p",null," Lis\xe4\xe4 osake "),s.a.createElement(p,{items:a.state.stockListFromApi.map((function(e){return e.name})),callbackFromApp:a.getStockFromSearchBar})))):!1===a.state.isLoading?s.a.createElement(s.a.Fragment,null,s.a.createElement("h1",null," Osakeseuranta "),s.a.createElement("div",{className:"Mainstarter"},s.a.createElement("div",{className:"Infobox"},s.a.createElement("p",null," Lis\xe4\xe4 osake seurantalistaan k\xe4ytt\xe4m\xe4ll\xe4 hakupalkkia. Osakkeeksi on mahdollista valita mik\xe4 tahansa Helsingin p\xf6rssin osakkeista. ")),s.a.createElement("div",{className:"AddstockStarter"},s.a.createElement("p",null," Lis\xe4\xe4 osake "),s.a.createElement(p,{items:a.state.stockListFromApi.map((function(e){return e.name})),callbackFromApp:a.getStockFromSearchBar})))):s.a.createElement("div",{className:"Loading"},s.a.createElement(b.a,{disableShrink:!0}))},a.state={currentStock:"",currentStockChange:"",values:[],stockListFromApi:[],stockList:[],isLoading:!0},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("a",{href:"https://github.com/arttusa/Stocks",target:"_blank",rel:"noopener noreferrer"},s.a.createElement("img",{className:"Githublogo",src:L.a,alt:"Github Logo"})),this.renderMain())}}]),t}(s.a.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"Wholepage"},s.a.createElement(j,null))}}]),t}(s.a.Component),C=a(170);c.a.render(s.a.createElement(C.a,null,s.a.createElement(y,null)),document.getElementById("root"))}},[[200,1,2]]]);
//# sourceMappingURL=main.38c65cd0.chunk.js.map