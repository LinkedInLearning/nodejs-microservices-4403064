# Node.js: Microservices
This is the repository for the LinkedIn Learning course Node.js: Microservices. The full course is available from [LinkedIn Learning][lil-course-url].

![Node.js: Microservices][lil-thumbnail-url] 

In this fast-paced era of distributed systems, mastering microservices—not just deploying services, but truly understanding the patterns and principles that drive them— is essential for developers. And in organizations large and small, Node.js is often the platform of choice for building microservices architectures. In this course, Daniel Khan
shows you how to use Node.js to create a microservice architecture from scratch and tackles the all-too-common challenge of transforming a monolithic app into a flexible, modular system composed of individual services. Throughout the course, Daniel explores crucial concepts like service discovery, resilience, and decoupling. Check out this course to gain practical knowledge of microservices that you can apply to your day-to-day work immediately.

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing
1. We need [Node.js](https://nodejs.org/en). I would just recommend installing the current LTS, means long-term supported version that you see here on the nodejs.org website. 
2. You will also need a Git client on your system to acquire the exercise files from GitHub. On [git-scm.com](https://git-scm.com/downloads) you will be presented with selections for your particular operating system. 
3. We will use [Docker](https://www.docker.com/). You will need to have Docker installed on your system. Download the respective installation files for your system. 

Once you have installed all of that on your system, you can check it in your console or terminal by running:
```
node -v
docker -v
git -v
``` 

These steps are covered in the video "Installing Git, Node.js, and Docker" in the course videos.

### Instructor

Daniel Khan 
                            
Technology Lead, Developer, Application Architect

                            

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/daniel-khan).

[lil-course-url]: https://www.linkedin.com/learning/node-js-microservices-22685072?dApp=59033956&leis=LAA
[lil-thumbnail-url]: https://media.licdn.com/dms/image/D560DAQGNhXwSHfVTTg/learning-public-crop_288_512/0/1691165894653?e=2147483647&v=beta&t=Ct2CRNdv8le_M-0mDHAtTX7YDIyGoRWAQr3D22q9FOY
