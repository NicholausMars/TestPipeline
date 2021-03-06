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
        echo "docker file"
            repositoryName('nicholaus93/docker-pipleline')
            tag('${GIT_REVISION,length=9}')
            registryCredentials('dockerhub')
            forcePull(false)
            forceTag(false)
            createFingerprints(false)
            skipDecorate()
        }
    }
}
