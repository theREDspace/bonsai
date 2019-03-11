pipeline {
    agent { docker { image 'node:9.5' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
