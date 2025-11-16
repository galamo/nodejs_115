# Microfrontends session
1. Create mf app
2. Container
3. Products
4. Cart  


## CSS
```css
body {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  font-size: 3rem;
  margin: auto;
  max-width: 900px;
  margin-top: 20px;
}

.host {
  display: flex;
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: space-around;
}

.container .mfItem {
  min-height: 500px;
  border: 1px solid green;
  padding: 10px;
  width: 50%;
}

```

## App container JSX
```jsx
<div className="container">
    <h1> Container -   Host  </h1>
    <div className="host">
      <div className="mfItem">
        Loading Products...
      </div>
      <div className="mfItem">
        Loading Cart...
      </div>
    </div>
  </div>

```


# Run time integration
- module federation

1. Run `npm i` in each folder [mfs]
2. Run Api - `npm start`
3. Run MF's
