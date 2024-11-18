# React Node E-commerce Application  

An advanced multi-vendor e-commerce platform with seamless **Paystack integration**, social login, and fully functional dashboards for vendors, users, and administrators. This project empowers vendors to manage their stores, users to shop efficiently, and admins to oversee platform activities effortlessly.  

## Features  
- **Multi-vendor Functionality:** Multiple vendors can register, manage their products, and view sales reports.  
- **User Dashboard:** Users can browse products, manage orders, and track their purchase history.  
- **Admin Dashboard:** Manage vendors, users, orders, and platform-wide configurations.  
- **Secure Payment Gateway:** Integrated with **Paystack** for secure and reliable payments.  
- **Social Authentication:** Streamlined login experience via popular platforms like Google and Facebook.  
- **Performance-Focused Design:** Optimized for speed and scalability.  

---

## Table of Contents  
1. [Installation](#installation)  
2. [Running the Application](#running-the-application)  
3. [Environment Variables](#environment-variables)  
4. [Application Flow](#application-flow)  
5. [Collaboration](#collaboration)  
6. [Bugs and Issues](#bugs-and-issues)  
7. [License](#license)  

---

## Installation  

### Prerequisites  
- **Node.js** (v16 or above)  
- **MongoDB** (local or cloud-based like MongoDB Atlas)  
- **Paystack Account** (for API keys)  
- **Google/Facebook App** (for social login)  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/devalentineomonya/React-Node-E-commerce-Application.git  
   ```  
2. Navigate to the project directory:  
   ```bash  
   cd React-Node-E-commerce-Application  
   ```  
3. Install server dependencies:  
   ```bash  
   cd server  
   npm install  
   ```  
4. Install client dependencies:  
   ```bash  
   cd ../client  
   npm install  
   ```  

---

## Running the Application  

1. Start the backend server:  
   ```bash  
   cd server  
   npm run dev  
   ```  

2. Start the frontend development server:  
   ```bash  
   cd ../client  
   npm run dev 
   ```  

3. Open your browser and navigate to:  
   ```
   http://localhost:5173  
   ```  

---

## Environment Variables  

Create a `.env` file in both the `server` and `client` directories with the following keys:  

### Server `.env`  
```env  
MONGO_URI=<your-mongodb-connection-string>  
PAYSTACK_SECRET_KEY=<your-paystack-secret-key>  
JWT_SECRET=<your-jwt-secret>  
GOOGLE_CLIENT_ID=<your-google-client-id>  
GOOGLE_CLIENT_SECRET=<your-google-client-secret>  
FACEBOOK_APP_ID=<your-facebook-app-id>  
FACEBOOK_APP_SECRET=<your-facebook-app-secret>  
PORT=5000  
```  

### Client `.env`  
```env  
REACT_APP_PAYSTACK_PUBLIC_KEY=<your-paystack-public-key>  
REACT_APP_API_BASE_URL=http://localhost:5000  
```  

---

## Application Flow  

### 1. Installation and Setup  
   - Install dependencies and set up the environment variables.  

### 2. User Registration/Login  
   - Users can register or log in via email or social platforms.  

### 3. Vendor Dashboard  
   - Vendors can add, update, and delete their products and view sales statistics.  

### 4. Admin Dashboard  
   - Administrators can manage platform-wide configurations and view reports.  

### 5. Payments  
   - Secure payments handled via Paystack.  

---

## Collaboration  

We welcome contributions! To contribute:  
1. Fork the repository.  
2. Create a feature branch:  
   ```bash  
   git checkout -b feature/your-feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Add your feature description"  
   ```  
4. Push to the branch:  
   ```bash  
   git push origin feature/your-feature-name  
   ```  
5. Create a pull request on the main repository.  

---

## Bugs and Issues  

If you encounter any issues, please report them using the [GitHub Issues](https://github.com/devalentineomonya/React-Node-E-commerce-Application/issues) page.  
Make sure to include:  
- Steps to reproduce the issue.  
- Expected and actual results.  
- Environment details (browser, OS, etc.).  

---

## License  

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.  

