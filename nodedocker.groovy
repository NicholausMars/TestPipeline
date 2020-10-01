job('NodeJS Docker example') {
    scm {
        git('https://github.com/NicholausMars/TestPipeline') {  node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('NicholausMars')
            node / gitConfigEmail('remember.marsman@gmail.com')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    wrappers {
        nodejs('nodejs') // this is the name of the NodeJS installation in
                         // Manage Jenkins -> Configure Tools -> NodeJS Installations -> Name
    }
    steps {
        dockerBuildAndPublish {
            repositoryName('nicholaus93/docker-pipleline')
            tag('${BUILD_TIMESTAMP}-${GIT_REVISION,length=7}')
            registryCredentials('docker-hub')
            forcePull(false)
            createFingerprints(false)
            skipDecorate()
        }
    }
}
