let x1 = 200; //位置
let a1 = 0; //加速度
let v1 = 0; //速度
let x0 = 0;

const ctx = document.getElementById('myChart').getContext('2d');

let labels1 = [];
for(let i=0; i<100; i++){
    labels1.push("");
}

let data0 = [];
for(let i=0; i<100; i++){
    data0.push(0);
}

let data1 = [];
for(let i=0; i<100; i++){
    data1.push(0);
}


const myChart = new Chart(ctx, {
  type: 'line', // ← 折れ線グラフ
  data: {
    labels: labels1, // X軸のラベル
    datasets: [{
      label: '目標値',
      data: data0, // Y軸の値
      borderColor: 'rgba(212, 47, 47, 1)', // 線の色
      backgroundColor: 'rgba(212, 47, 47, 1)', // 塗りつぶしの色
      borderWidth: 2,
      fill: false, // 線の下を塗りつぶさない
      pointRadius: 0, // 点の大きさ（0にすると点を非表示）
      tension: 0.3 // 線を滑らかに（0なら折れ線）
    },{
      label: '出力',
      data: data1, // Y軸の値
      borderColor: 'rgba(75, 192, 192, 1)', // 線の色
      backgroundColor: 'rgba(75, 192, 192, 1)', // 塗りつぶしの色
      borderWidth: 2,
      fill: false, // 線の下を塗りつぶさない
      pointRadius: 0, // 点の大きさ（0にすると点を非表示）
      tension: 0.3 // 線を滑らかに（0なら折れ線）
    }]
  },
  options: {
    responsive: false,
    scales: {
      y: {
        min:-400,
        max:400
      }
    }
  }
});


let i = 0;


function setup(){
    createCanvas(600, 200);

}

function draw(){


    //描画

    background(240);


    translate(width/2, 0);

    noStroke();
    fill(75, 192, 192);
    circle(x1, height/2, 20);

    fill(212, 47, 47);
    circle(x0, height/2, 16);

    if(frameCount % 2 == 0){

        data1[0] = x1;
        for(let j=data1.length-1; j>0; j--){
            data1[j] = data1[j-1];
        }

        data0[0] = x0;
        for(let j=data0.length-1; j>0; j--){
            data0[j] = data0[j-1];
        }

        myChart.data.datasets[0].data = data0;
        myChart.data.datasets[1].data = data1;
        myChart.update();

    }



    //処理

    a1 = (x0 - x1) * 0.001 - v1 * 0.01;
    v1 += a1;
    x1 += v1;

    if(mouseIsPressed){
        x0 = mouseX - width/2;
    }

}