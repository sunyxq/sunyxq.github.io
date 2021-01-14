Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'node:10.17' }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}