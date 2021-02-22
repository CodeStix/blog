---
description: A fast, completely type-checked React form state manager. Supports nested objects/arrays.
name: typed-react-form
themeColor: "#aaaaff"
thumbnails:
    - https://raw.githubusercontent.com/CodeStix/typed-react-form/master/example/public/thumb.png
type: project
updated: "Feb 22 2021"
githubRepo: CodeStix/typed-react-form
---

React using **javascript** is great, but for larger projects, it can get quite tedious when refactoring code. For example, when renaming a property, **vscode** (for example) does not always replace every occurrence, which can lead to frustrating search-and-destroy bug scenarios.

Fortunately, there is **typescript**. When set up correctly, **typescript** will whine (typescript: :angry:) about variables and functions that you try to access but don't exist. This makes maintaining a big project so much easier because it lets you know where things do not seem right.

**✔️ Basic example**
![js vs ts](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m0tiy0r2zo6z9dt5cswo.png)

## Why?

Recently, I had to build an application for a client, which contained a lot of large forms. A few examples of forms I had to create:

-   A form to create questionnaires, which is a list of questions, which must be able to contain more than 30 questions. For each list item, 5 inputs would be created. :fearful:
-   A form to create a post.
-   A form to create an event.
-   A form to register and login.
-   _The list keeps on going..._

Great! Let's use a form management library. I had used **Formik** and **react-hook-form** before, they were fine and I used **Formik** for a while.

Because there were a lot of big forms, I had to refactor these a lot, when renaming a field for example. Unfortunately, **Formik** does not warn you if forget to rename an input name. This required me to manually double-check inputs when renaming fields to see if its field name was set up correctly.

![renaming problem](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ywph2v0fnr88r1e9rvar.gif)

This was the main problem I had with these form management libraries. They are great for React with **javascript**, but with **typescript**, it would be nice to have a type-checked solution.

Secondly, **Formik** was too slow for the questionnaire form (which contains a list of 50+ inputs), it caused everything to rerender each time. (Not the case with **react-hook-form**) :confused:

I looked for a decent type-checked React form manager, but couldn't find any.
After all of this, I decided to write my own!

## Development

When starting this project, there were a few things I wanted to make sure to include:

-   Type checking!
-   Fast dynamic array fields
-   Validation using **yup**
-   Keeping it simple

### Challenge 1: Type checking & nested fields

A nested field is a field inside an object.
When using **Formik**, you use a dot to specify nested fields:

**✔️ Using Formik with nested fields**

```jsx
// `user` is an object
<Formik initialValues={{ email: "john@example.com", user: { name: "John" } }}>
    {() => (
        <Form>
            <Field name="email" />
            {/* Using a dot */}
            <Field name="user.name" />
        </Form>
    )}
</Formik>
```

Unfortunately, there is no way to type-check this, **typescript** cannot know that `"user.name"` (as a string) means the `"name"` field in the `"user"` field. **Typescript** can only type-check field names in the upper-most object.

![keyof test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3fl6bc905sa84oknuwom.png)

The solution is _child forms_! Like a normal form is based on an object containing initial values, a _child form_ is a form based on an object field in another form.

**✔️ Using typed-react-form with nested fields**

```jsx
// `user` is an object
const form = useForm({ email: "john@example.com", user: { name: "John" } });
// The "user" string is type checked and is a key of form.values
const userForm = useChildForm(form, "user");
return (
    <form>
        <FormInput form={form} name="email" />
        {/* The "name" string is type checked and is a key of userForm.values */}
        <FormInput form={userForm} name="name" />
    </form>
);
```

**Typescript** knows that values in `userForm` come from the value of the `"user"` field in `form`, its parent.

This way, type-checking is possible:

![type checking](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k190cquypdeyfff1kd28.gif)

Great! Problem 1 is solved! :grinning:

### Challenge 2: Minimal rerenders & fast array fields

Most of the form libraries rerender the whole form when something changes, in my case, this is a problem, because I have array fields containing 50+ items, which would all be rerendered and cause lagging.

The solution is to only rerender the things that have changed. This works by using _listeners_; hooks/components that listen for state changes on a specific (or all) fields of a form. Listener hooks behave a lot like `useState`.

The built-in inputs like `<FormInput />` use this hook and only rerender itself when needed. The `useForm` hook, for example, does not cause a rerender when something changes, it only creates a form state manager, which others can listen to.

![array rendering](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fep1rtnlhrkg8zthtgpc.gif)

**Red flashes indicate what parts of the form are being re-rendered.**

As you can see, Formik rerenders the whole array each time something changes, while `typed-react-form` only rerenders the array when its size changes. Awesome! :open_mouth:

## Final thoughts

I wrote this post because I'm pretty sure I'm not the only one that would be interested in a completely type-checked solution like this.

[**Check out the documented project here.**](https://github.com/CodeStix/typed-react-form/wiki)

I would definitely like some feedback on the documentation. This is the first time writing such an extended documentation and I have to say, it is hard to write easy to understand documentation **for others** when you know every detail of the project **yourself**.

Anyway, I hope this was interesting for some of you.
Have a great day and thanks for reading! :smile:
