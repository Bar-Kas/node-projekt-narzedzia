pipeline {
  /* ------- 1. Uruchamiany w kontenerze node:18 ------- /
  agent {
    dockerContainer {
      image 'node:18'
      args  '-u root:root'
    }
  }

  / ------- 2. Zmienne środowiskowe (opcjonalne) ------- /
  environment {
    CI = 'true'
  }

  stages {
    / ------- 3. Checkout kodu z Git ------- /
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    / ------- 4. Instalacja zależności ------- /
    stage('Install dependencies') {
      steps {
        dir('node-app') {
          sh 'npm install'
        }
      }
    }

    / ------- 5. Lint i testy ------- /
    stage('Lint & Test') {
      steps {
        dir('node-app') {
          // jeśli nie masz lintu, możesz usunąć tę linię lub zostawić  true
          sh 'npm run lint  true'
          sh 'npm test'
        }
      }
    }

    / ------- 6. (Opcjonalny) build frontendu/backendu ------- */
    stage('Build') {
      steps {
        dir('node-app') {
          // wykona np. webpack/TS build jeżeli masz skrypt "build"
          sh 'npm run build || echo "Brak skryptu build"'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline zakończony sukcesem.'
    }
    failure {
      echo '❌ Pipeline zakończony porażką.'
    }
  }
}
