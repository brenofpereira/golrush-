//Descrição: https://docs.google.com/document/d/1S0elrXIo7atK1s2HMS3-hlQL1sZKDQ9Untg-aQ4y_TY/edit?usp=sharing


var tela = 0;
var pontos1 = 0;
var pontos2 = 0;
var acabou = false;
var jogador1, jogador2, bola;
var golAltura = 80;
var golLargura = 10;
var input1, input2, botaoConfirmar;
var mensagemErro = "";
var nomes = ["", ""];

function setup() {
  createCanvas(400, 400);
  iniciarJogo();
}

function preload() {
  autor = loadImage('breno.jpg');
  professor = loadImage('professor.jpg');
}

function draw() {
  if (tela == 0) {
    background(220);
    noStroke();
    for (var i = 0; i < 20; i++) {
      fill(random([color(255, 0, 0), color(0, 0, 255)]));
      ellipse(random(width), random(height), 20);
    }

    fill(0, 0, 255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("GOL Rush!", width / 2, 60);

    fill(255, 0, 0);
    rect(120, 100, 150, 30, 10);
    fill(0);
    textSize(20);
    text("Jogar", 195, 117);

    fill(255, 0, 0);
    rect(120, 150, 150, 30, 10);
    fill(0);
    text("Instruções", 195, 167);

    fill(255, 0, 0);
    rect(120, 200, 150, 30, 10);
    fill(0);
    text("Créditos", 192, 217);
  }

  else if (tela == 1) {
    background(0, 150, 0);

    stroke(255);
    strokeWeight(2);
    line(width / 2, 0, width / 2, height);
    noFill();
    ellipse(width / 2, height / 2, 100);

    fill(255);
    rect(0, height / 2 - golAltura / 2, golLargura, golAltura);
    rect(width - golLargura, height / 2 - golAltura / 2, golLargura, golAltura);

    if (acabou) {
      textSize(20);
      fill(255);
      noStroke();
      textAlign(CENTER);
      var vencedor = pontos1 == 5 ? nomes[0] : nomes[1];
      text(vencedor + " venceu!", width / 2, height / 2);
      text("Aperte 0 para reiniciar", width / 2, height / 2 + 30);
      return;
    }

    fill(255);
    noStroke();
    textSize(18);
    textAlign(CENTER);
    text(pontos1 + " : " + pontos2, width / 2, 30);

    fill(255, 0, 0);
    ellipse(jogador1.x, jogador1.y, 40);
    fill(0, 0, 255);
    ellipse(jogador2.x, jogador2.y, 40);

    fill(255);
    ellipse(bola.x, bola.y, 20);
    bola.x += bola.vx;
    bola.y += bola.vy;

    if (bola.y < 10 || bola.y > height - 10) bola.vy *= -1;

    if (
      bola.x < 0 &&
      (bola.y < height / 2 - golAltura / 2 || bola.y > height / 2 + golAltura / 2)
    ) {
      bola.x = 5;
      bola.vx *= -1;
    }

    if (
      bola.x > width &&
      (bola.y < height / 2 - golAltura / 2 || bola.y > height / 2 + golAltura / 2)
    ) {
      bola.x = width - 5;
      bola.vx *= -1;
    }

    if (
      bola.x < 0 &&
      bola.y > height / 2 - golAltura / 2 &&
      bola.y < height / 2 + golAltura / 2
    ) {
      pontos2++;
      reiniciarBola();
    } else if (
      bola.x > width &&
      bola.y > height / 2 - golAltura / 2 &&
      bola.y < height / 2 + golAltura / 2
    ) {
      pontos1++;
      reiniciarBola();
    }

    if (keyIsDown(87)) jogador1.y -= 5;
    if (keyIsDown(83)) jogador1.y += 5;
    if (keyIsDown(65)) jogador1.x -= 5;
    if (keyIsDown(68)) jogador1.x += 5;

    if (keyIsDown(UP_ARROW)) jogador2.y -= 5;
    if (keyIsDown(DOWN_ARROW)) jogador2.y += 5;
    if (keyIsDown(LEFT_ARROW)) jogador2.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) jogador2.x += 5;

    jogador1.x = constrain(jogador1.x, 15, width - 15);
    jogador1.y = constrain(jogador1.y, 15, height - 15);
    jogador2.x = constrain(jogador2.x, 15, width - 15);
    jogador2.y = constrain(jogador2.y, 15, height - 15);

    if (dist(bola.x, bola.y, jogador1.x, jogador1.y) < 25) {
      let dx = bola.x - jogador1.x;
      let dy = bola.y - jogador1.y;
      let mag = sqrt(dx * dx + dy * dy);
      bola.vx = (dx / mag) * 5;
      bola.vy = (dy / mag) * 5;
    }
    if (dist(bola.x, bola.y, jogador2.x, jogador2.y) < 25) {
      let dx = bola.x - jogador2.x;
      let dy = bola.y - jogador2.y;
      let mag = sqrt(dx * dx + dy * dy);
      bola.vx = (dx / mag) * 5;
      bola.vy = (dy / mag) * 5;
    }

    if (pontos1 == 5 || pontos2 == 5) acabou = true;
  }

  else if (tela == 2) {
    background(220);
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Como jogar:", width / 2, 90);
    text("Jogador 1: WASD", width / 2, 130);
    text("Jogador 2: Setas", width / 2, 160);
    text("5 gols vence!", width / 2, 190);
    text("Na tela de jogo: ", width / 2, 230);
    text("Clique na tecla B caso queira voltar", width / 2, 260);
    text("Para reiniciar o jogo clique na tecla 0", width / 2, 280);

    fill(0, 0, 255);
    rect(280, 350, 90, 30, 10);
    fill(0);
    textSize(20);
    text("Voltar", 323, 366);
  }

  else if (tela == 3) {
    background(220);
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Créditos", width / 2, 60);
    imageMode(CENTER);
    image(autor, 50, 140, 80, 80);
    image(professor, 50, 240, 80, 80);
    text("Breno Felipe", 160, 120);
    text("Aluno C&T", 152, 140);
    text("Turma 03A", 152, 160);

    text("Aquiles Burlamaqui", 190, 215);
    text("Professor ECT", 170, 235);

    fill(0, 0, 255);
    rect(280, 350, 90, 30, 10);
    fill(0);
    textSize(20);
    text("Voltar", 323, 366);
  }

  else if (tela == 4) {
    background(220);
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Digite os nomes dos jogadores:", width / 2, 60);
    
    textSize(16);
    text("Jogador 1:", 140, 90);
    text("Jogador 2:", 140, 140);

    if (!input1) {
      input1 = createInput();
      input1.position(width / 2 - 100, 100);
    }

    if (!input2) {
      input2 = createInput();
      input2.position(width / 2 - 100, 150);
    }

    if (!botaoConfirmar) {
  botaoConfirmar = createButton("Começar Jogo");
  botaoConfirmar.position(width / 2 - 60, 200);
  botaoConfirmar.mousePressed(() => {
    var nome1 = input1.value().trim();
    var nome2 = input2.value().trim();

    if (nome1 === "" || nome2 === "") {
      mensagemErro = "Por favor, preencha os nomes dos dois jogadores.";
    } else {
      nomes[0] = nome1;
      nomes[1] = nome2;

      input1.remove();
      input2.remove();
      botaoConfirmar.remove();
      input1 = input2 = botaoConfirmar = null;
      mensagemErro = "";

      iniciarJogo();
      mudarTela(1);
    }
  });
}
    
     if (mensagemErro !== "") {
  fill(255, 0, 0);
  textSize(14);
  textAlign(CENTER);
  text(mensagemErro, width / 2, 250);
}


      fill(0, 0, 255);
      rect(280, 350, 90, 30, 10);
      fill(0);
      textSize(20);
      text("Voltar", 323, 366);
  }

  //fill(0);
 // textSize(12);
 // text(mouseX + " " + mouseY, 40, 15);
}

function mudarTela(novaTela) {
  if (tela === 4 && novaTela !== 4) {
    if (input1) {
      input1.remove();
      input1 = null;
    }
    if (input2) {
      input2.remove();
      input2 = null;
    }
    if (botaoConfirmar) {
      botaoConfirmar.remove();
      botaoConfirmar = null;
    }
  }
  
  tela = novaTela;
  if (tela == 1) {
    resizeCanvas(600, 400);
  } else {
    resizeCanvas(400, 400);
  }
}

function iniciarJogo() {
  jogador1 = { x: golLargura + 25, y: height / 2 };
  jogador2 = { x: width - golLargura - 25, y: height / 2 };
  pontos1 = 0;
  pontos2 = 0;
  acabou = false;
  reiniciarBola();
}

function reiniciarBola() {
  bola = {
    x: width / 2,
    y: height / 2,
    vx: random([-5, 5]),
    vy: random(-3, 3)
  };
}

function keyPressed() {
  if (tela == 1) {
    if (key === '0') {
      iniciarJogo();
      mudarTela(1);
    }
    if (key === 'b') {
      iniciarJogo();
      mudarTela(4);
    }
  }
}

function mouseClicked() {
  if (tela == 0) {
    if (mouseX > 120 && mouseX < 270 && mouseY > 100 && mouseY < 130) {
      mudarTela(4);
    }
    if (mouseX > 120 && mouseX < 270 && mouseY > 150 && mouseY < 180) {
      mudarTela(2);
    }
    if (mouseX > 120 && mouseX < 270 && mouseY > 200 && mouseY < 230) {
      mudarTela(3);
    }
  }
  if ((tela == 2 || tela == 3 || tela == 4) && mouseX > 280 && mouseX < 370 && mouseY > 350 && mouseY < 380) {
    mudarTela(0);
  }
}
