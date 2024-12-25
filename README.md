This is a React App for managing user & roles with interfaces to create, read, update and delete users & roles. Additionally, there is a drag-and-drop interface to map multiple users to roles easily at one go. 
Currently, the app uses local store (localStorage) to maintain the users & roles created through the frontend interface and the app state is managed by Redux Store. 

The codebase has reusable components such as BasicForm and BasicTable that render the respective pages based on the configuration object passed to them and the rendering of the UI elements (textbox, dropdown, textarea) in the component with additional functionality such as Form validation is managed internally within them.


1. Please run `npm install` to install the dependencies

2. Please run `npm run start` to start the dev server

3. Use the following credential for initial login:

Email - admin@admin.com

Password - 12345

4. All the users created through Admin UI will have the password `12345` by default
