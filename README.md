# rbvj

I'm fixing bugs and working on new features for RBVJ to be included in FullPageOS as a demo app. 

All updates can be found in the [Development Blog](BLOG.md)

## Demo URL

https://sheltered-island-26844.herokuapp.com

## Build and deploy to heroku

You need heroku CLI installed. If you're on a Mac:

```bash
$ brew tap heroku/brew && brew install heroku
```

### Create a heroku project and commit to git

```bash
$ bundle install
$ heroku create
$ git add .
$ git commit -m "RBVJ on Heroku. Patch 20 is default"
```

### Publish to heruko

```bash
$ git push heroku master
$ heroku open
```

## To test locally

```bash
$ rackup
```

Open your browser at http://localhost:9292

# Original Tutorial by radarbor and code explanation here:

https://medium.com/@radarboy3000/how-to-create-a-vj-engine-in-javascript-b63b7fb1c87b


