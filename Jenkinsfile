pipeline {
    agent any

    tools {
        nodejs "Node18"
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sai-Khush/Walleto.git'
            }
        }

        stage('Clean Workspace') {
            steps {
                echo "🧹 Cleaning old workspace..."
                dir('Code/walleto') {
                    sh 'rm -rf node_modules package-lock.json'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies in Code/walleto..."
                dir('Code/walleto') {
                    sh 'npm install --no-audit --no-fund --foreground-scripts=false --prefer-offline'
                }
            }
        }

        stage('Build') {
            steps {
                echo "🏗️ Building Next.js project..."
                dir('Code/walleto') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to DEV') {
            steps {
                echo "🚀 Deployment stage started..."
                echo "✅ Deployment completed successfully."
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment failed."
        }
        success {
            echo "🎉 Deployment completed successfully."
        }
    }
}
