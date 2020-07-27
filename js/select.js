let maker1 = "";
let maker2 = "";
let lightName1 = "";
let lightName2 = "";
let beamCompChart = "";
let runTimeChart = "";
let runTimeD = [];
let maxDataComp = 0;
let maxDataRunTime = 0;
let modelName1,modelName2,modelName = "";
let lrNum = 0;
let labelData,runTimeX =[];
let imgNum = 0;
let addBtn ="";
let dataMode = "";
let addLabel = "";
let addSpecList = "";
let getShopLink ="";

function SelectChange(i,q) {
    lrNum = q
    let Select = document.getElementById("Select"+ q);
    Select.disabled = false;
    Select.innerHTML = '';
    let option = document.createElement('option');
    option.innerHTML = 'ライトを選択';
    option.defaultSelected = true;
    option.disabled = true;
    Select.appendChild(option);
    lightList[i].forEach(mode => {
        let option = document.createElement('option');
        option.innerHTML = mode;
        option.value = mode;
        Select.appendChild(option);
    });

    if (q == 2) {
        maker1 = i;
    } else {
        maker2 = i;
    }

    let bl = document.getElementById("BeamLink" + q)
    bl.innerHTML = defaultBeamLink;
}

function SelectChange2(m,n) {
    lrNum = n
    let BeamLink = document.getElementById("BeamLink" + n);
    BeamLink.innerHTML ='';
    getShopLink = document.getElementById("shopLink" + n);
    getShopLink.innerHTML ='';
    addSpecList = document.getElementById("list" + lrNum);
    addSpecList.innerHTML ='';
    let specLightName = document.getElementById("specLightName" + lrNum);
    specLightName.innerHTML = '';
    let m2 = m.replace(/\s+/g,'');
    let brand = data[m].BRAND;

    let ShotImg = `BRAND/${brand}/${m2}/${m2}_0.jpg`;
    let ShapeImg = `BRAND/${brand}/${m2}/${m2}_bsh.jpg`;
    let SpecImg = `BRAND/${brand}/${m2}/${m2}.jpg`;
    let SideImg = `BRAND/${brand}/${m2}/${m2}_side.jpg`;
    let TopImg = `BRAND/${brand}/${m2}/${m2}_top.jpg`;


    if (n == 2) {
        document.leftShotImg.src = ShotImg;
        document.leftShapeImg.src = ShapeImg;
        document.leftSpecImg.src = SpecImg;
        document.leftSideImg.src = SideImg;
        document.leftTopImg.src = TopImg;
        lightName1 = m;
        runTimeD[0] = data[m].runTimeChartData.map(n => Math.floor(n / (Math.max(...data[m].runTimeChartData)) * 100));
        specLightName = addSpecNameL(m, specLightName);
    } else {
        document.rightShotImg.src = ShotImg;
        document.rightShapeImg.src = ShapeImg;
        document.rightSpecImg.src = SpecImg;
        document.rightSideImg.src = SideImg;
        document.rightTopImg.src = TopImg;
        lightName2  = m;
        runTimeD[1] = data[m].runTimeChartData.map(n => Math.floor(n / (Math.max(...data[m].runTimeChartData)) * 100));
        // runTimeX[1] = runTimeData[m]
        specLightName = addSpecNameR(m, specLightName);
    }

    // BEAM SHOTのモードリンク生成
    addBeamLink(n, m, BeamLink);

    // ShopLinkにデータが入ってたらリンクを生成
    if (data[m].ShopLink1 != undefined ||data[m].ShopLink2 != undefined) {
        addShopLink(m);
    }     

    // セレクトボックス変更時のチャート描画
    maxdata(m);
    timeConvert();

    if (runTimeChart) {
        runTimeChart.destroy();
    }

    drawChart2();

    
    // スペックリスト追加
   
    getSpecList(m);
    
    // ラジオボタンの初期表示を1番目に設定
    let radioBtn = document.getElementsByName("lm"+ n);
    radioBtn[0].checked = true;
}

// ショッピングリンク生成
function addShopLink(m){
    let addP = document.createElement('p');
    let addUl = document.createElement('ul');
    addP.innerHTML = "SHOP LINK";
    getShopLink.appendChild(addP);
    getShopLink.appendChild(addUl);
    if (data[m].ShopLink1 != undefined) {
        let dataShopLink1 = data[m].ShopLink1;
        for (let [key,value] of Object.entries(dataShopLink1)) {
            let addList = document.createElement('li');
            let addLink = document.createElement('a');
            addLink.classList.add('shopBtn');
            addLink.setAttribute('target', '_blank');
            addLink.setAttribute('rel', 'noopener nofollow');
            addLink.href = value;
            addLink.innerHTML = key;
            addUl.appendChild(addList);
            addList.appendChild(addLink);
        }
    }
    if (data[m].ShopLink2 != undefined) {
        let dataShopLink2 = data[m].ShopLink2;
        for (let [key,value] of Object.entries(dataShopLink2)) {
           let addList = document.createElement('li');
           addList.innerHTML = value;
           addUl.appendChild(addList);
    }
}
function addShopLink2(m){

    }
}

function addShopLink1(m){

}

function addSpecNameL(m, specLightName) {
    modelName1 = document.getElementById("labelName1");
    modelName1.innerText = m;
    modelName = m;
    specLightName = document.getElementById("specLightName2");
    specLightName.innerHTML = maker1 + " " + lightName1;
    return specLightName;
}
function addSpecNameR(m, specLightName) {
    modelName2 = document.getElementById("labelName2");
    modelName2.innerText = m;
    modelName = m;
    specLightName = document.getElementById("specLightName4");
    specLightName.innerHTML = maker2 + " " + lightName2;
    return specLightName;
}

// スペックリスト生成
function getSpecList (m){        
    let dataSpec = data[m];

   
        let addDt1 = document.createElement('dt');
        let addDd1 = document.createElement('dd');
        let addDt2 = document.createElement('dt');
        let addDd2 = document.createElement('dd');
        let addDt3 = document.createElement('dt');
        let addDd3 = document.createElement('dd');
        let addDt4 = document.createElement('dt');
        let addDd4 = document.createElement('dd');
        let addDt5 = document.createElement('dt');
        let addDd5 = document.createElement('dd');
        let addDt6 = document.createElement('dt');
        let addDd6 = document.createElement('dd');
        let addDt7 = document.createElement('dt');
        let addDd7 = document.createElement('dd');
        let addDt8 = document.createElement('dt');
        let addDd8 = document.createElement('dd');

        addDt1.innerHTML = "MAX OUTPUT";
        addDd1.innerHTML = dataSpec["MAX-OUTPUT"];
        addDt2.innerHTML = "MODE";
        let dataMode = dataSpec.MODE
        
        for (let [key,value] of Object.entries(dataMode)) {
            addDd2.innerHTML += key + " : " + value["LUMENS"] + " [" + value["RUNTIME"]+ "]<br>";
        }

        addDt3.innerHTML = "FLASH MODE";
        
        let dataMode2 = dataSpec.MODE2
            for (let [key,value] of Object.entries(dataMode2)) {
                addDd3.innerHTML += key + " : " + value["LUMENS"] + " [" + value["RUNTIME"]+ "]<br>";
            }
        addDt4.innerHTML = "WEIGHT";
        addDd4.innerHTML = dataSpec["WEIGHT"];
        addDt5.innerHTML = "SIZE";
        addDd5.innerHTML = dataSpec["SIZE"];
        addDt6.innerHTML = "BATTERY";
        addDd6.innerHTML = dataSpec["BATTERY"];
        addDt7.innerHTML = "RECHARGE TIME";
        addDd7.innerHTML = dataSpec["RECHARGE TIME"];
        addDt8.innerHTML = "WATER RESISTANCE";
        addDd8.innerHTML = dataSpec["WATER-RESISTANT"];
        addSpecList.appendChild(addDt1);
        addSpecList.appendChild(addDd1);       
        addSpecList.appendChild(addDt2);
        addSpecList.appendChild(addDd2);       
        addSpecList.appendChild(addDt3);
        addSpecList.appendChild(addDd3);       
        addSpecList.appendChild(addDt4);
        addSpecList.appendChild(addDd4);       
        addSpecList.appendChild(addDt5);
        addSpecList.appendChild(addDd5);       
        addSpecList.appendChild(addDt6);
        addSpecList.appendChild(addDd6);       
        addSpecList.appendChild(addDt7);
        addSpecList.appendChild(addDd7);       
        addSpecList.appendChild(addDt8);
        addSpecList.appendChild(addDd8);       
} 

// BEAM SHOT モードリンク生成
function addBeamLink(n, m, BeamLink) {
    dataMode = data[m].MODE;
    imgNum=0;
    for (const key of Object.keys(dataMode)) {
        addBtn = document.createElement("input");
        addBtn.classList.add("changeBtn" + n);
        addLabel = document.createElement("label");
        addBtn.type = "radio";
        addBtn.value = m + "_" + imgNum;
        imgNum++;
        addBtn.name = "lm" + n;
        BeamLink.appendChild(addLabel);
        addLabel.appendChild(addBtn);
        addLabel.insertAdjacentHTML('beforeend', [key] + " : " + dataMode[key].LUMENS + " [" + dataMode[key].RUNTIME + "]");
    }
}

let setBSI = document.querySelector("#beamShotImg");
let setHandle = document.querySelector(".twentytwenty-handle ");


let selectLeft = document.getElementsByClassName("changeBtn2");
let selectRight = document.getElementsByClassName("changeBtn4");

addEventListener("click",changeImgLeft);
function changeImgLeft(){
    for (let i = 0; i < selectLeft.length; i++) {
        if (selectLeft[i].checked) {
            let imgName = selectLeft[i].value.replace(/\s+/g,'');
            let imgFolder = selectLeft[i].value.replace(/_\d/,'').replace(/\s+/g,'');
            document.leftShotImg.src = `BRAND/${maker1}/${imgFolder}/${imgName}.jpg`;
        } 
    }
}
addEventListener("click",changeImgRight);
function changeImgRight(){
    for (let i = 0; i < selectRight.length; i++) {
        if (selectRight[i].checked) {
            let imgName = selectRight[i].value.replace(/\s+/g,'');
            let imgFolder = selectRight[i].value.replace(/_\d/,'').replace(/\s+/g,'');
            document.rightShotImg.src = `BRAND/${maker2}/${imgFolder}/${imgName}.jpg`;
        } 
    }
}

// 画像比較 
$(window).on("load", function() {
    $("#beamShotImg").twentytwenty({default_offset_pct: 0.5});
});
// チャート最大値取得
function maxdata(m) {
    maxDataRunTime = Math.max(...data[m].runTimeChartData) + 100;
}
// runtimechartの値をを100%に変換　初期値にしか使ってない
function maxdataConvert(l,r){
    runTimeD[0] = runTimeD[0].map(n => Math.floor(n / (Math.max(...data[l].runTimeChartData)) * 100));
    runTimeD[1] = runTimeD[1].map(n => Math.floor(n / (Math.max(...data[r].runTimeChartData)) * 100));
    // runTimeData2 = runTimeD[1].map(n => Math.floor(n / (Math.max(...runTimeChartData[r])) * 100));
}
// 対象データの個数を分数に変換
function timeConvert(){ 
    // labelData = runTimeD.map(n => Math.max(runTimeD[0].index,runTimeD[1].index));
    if (runTimeD[0].length > runTimeD[1].length) {
        labelData = runTimeD[0].map((val,index)　=> index + " min")
    } else {
        labelData = runTimeD[1].map((val,index)　=> index + " min")
    }
}

// 初期描画
window.onload = function(){
 
    lightName1 = "LIGHT 1";
    lightName2 = "LIGHT 2";
    
    function runTimeDef(){
        runTimeD = [data["VOLT800"].runTimeChartData,data["VOLT400"].runTimeChartData];
        labelData = runTimeD[0].map((val,index)　=> index + " min");
        runTimeChart = "";
        maxdataConvert("VOLT800","VOLT400");
        if (runTimeChart) {
            runTimeChart.destroy();
        }
        this.drawChart2();
    } runTimeDef();
    
}

// チャート描画 runTimeChart
function drawChart2(){
    var ctx = document.getElementById("runTimeChart");
    runTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: labelData,
        datasets: [
            {
            label: lightName1,
            data: runTimeD[0],
            borderColor: "#66d9ff",
            backgroundColor:"#66d9ff",
            fill: false,
            },
            {
            label: lightName2,
            data: runTimeD[1],
            borderColor: "#ff8080",
            backgroundColor: "#ff8080",
            fill: false,
            }
        ],
        },
        options: {
            title: {
                display: false,
                text: 'ビーム比較'
                },
            scales: {
                xAxes: [{
                    scaleLabel:{
                        display:true,
                        labelString:　'Time (minutes)',
                        fontColor:"3c3c3c",
                        fontSize:13
                    },
                    ticks: {
                        max:  250,
                        min: 0,
                        stepSize: 20,
                        callback: function(value, index, values){
                        return  ((index % 10) == 0)? index : ''
                        },
                    }
                }],
                yAxes: [{
                    scaleLabel:{
                        display:true,
                        labelString:　'Brightness (% of Max)',
                        fontColor:"3c3c3c",
                        fontSize:13
                    },
                    ticks: {
                        suggestedMax:  100,
                        suggestedMin: 0,
                        stepSize: 10,
                        callback: function(value, index, values){
                        return  value + '%'
                        }
                    }
                }]
            },
        }
    });
    }

