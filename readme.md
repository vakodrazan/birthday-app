# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck


 ## Report: 

 ### Structure:
    In this project we need to fetch the data from a local json file.

 - First of all, I created a big function that store all of the work inside of it.
 - Then I store the html that is mapping through all the people list to make it mutable function.
 - Allow the user to edit and delete from the list.
 - Allow the user to add new person in the list.
 - Store all the data in the local storage.
 - To keep the file clean refactor the code by using some file, to export functions or elements. Then import it where it needed.
 - Filter the list by searching people in the list's name or month.

 ### Improvements: 

 This project was tough, even to get it set up. I was feeling confindent to work with local storage.

 - If I had more time, I woul do the sorting list which is from the soonest birthday date.
 
 - Then I would try another strategy so that I can refactor it as possible as it can be.

 ### Lessons learned: 

I can strongly say that I have learned many thing in this project. I'm getting used to with local storage and edit, delete from the list

 - First of all, I knew that we cannot use parcel to run the program when fetching the data from a local json file. I have to open it with live server instead, here the problem came because I could not import the date from date-fns, so I have to use another strategy.
 - I also learn that we can change the date into string by using `toLocaleString()` we take which language to use and we can choose whether to use `numeric` or text by using `long` keywords.
 - Getting more knowledge about refactoring the code by importing files.
 - I create a file that store the html that does nothing with the data. Then I noticed that when I submit with the form that I just add, it doubled the one I have submit before.

 ### Biggest challenge: 
 - My first problem was to get date set up which I could not import date-fns. I have to find another way to get the date set up.
 - Then I wanted to sort the list by the soonest date untill the person's birthday come. I couldn't take the get it works. 

 ### More explanation: 
 - I would like to have more explanation about, when to use parcel and live server.
 - Also, is there any possible way to use parcel instead of live server when fetching a local file. Using parcel allows us to import module from outside file.

 ### Other commnent: 
 This project was tough but a good practice because we face lots of problems. We have the best opportunity to learn some new things.