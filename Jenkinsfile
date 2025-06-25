pipeline {
  agent {
    docker {
      image 'node:18'
      args  '-u root:root'    // aby mieć prawa do zapisu w workspace
    }
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Bar-Kas/node-projekt-narzedzia.git', branch: 'master'
      }
    }

    stage('Build and Test') {
      steps {
        // te kroki teraz wykonują się wewnątrz kontenera node:18
        sh 'cd node-app && npm install'
        sh 'cd node-app && npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        // a ten krok możemy nadal wykonywać na hoście (ma dostęp do docker.sock)
        sh 'docker build -t node-app:latest node-app'
      }
    }
  }
}
