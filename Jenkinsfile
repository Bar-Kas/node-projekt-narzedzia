pipeline {
  agent any

  stages {
    stage('Build & Test') {
      agent {
        docker {
          image 'node:18'
          args  '-u root:root'   // (opcjonalnie) aby mieć prawa do zapisu
        }
      }
      steps {
        sh 'cd node-app && npm install'
        sh 'cd node-app && npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        // teraz po prostu wywołujesz docker CLI na hoście:
        sh 'docker build -t node-app:latest node-app'
      }
    }
  }
}
