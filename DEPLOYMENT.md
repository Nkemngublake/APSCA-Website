# How to Deploy APSCA Website for Free

Here are the two easiest ways to deploy your Vite website for free.

## Option 1: Netlify Drop (Easiest & Fastest)

**Best for:** Quick preview, no Git required.

1. **Build the project locally** (I have already done this for you):
    The `dist` folder in your project directory contains the production-ready website.
    Path: `/Users/blakenkemngu/APSCA Website/dist`

2. **Go to Netlify**:
    Open [app.netlify.com/drop](https://app.netlify.com/drop).

3. **Drag and Drop**:
    Drag the `dist` folder from your file explorer and drop it onto the Netlify page.

4. **Done!**
    Netlify will give you a live URL immediately. You can change the site name in "Site Settings".

---

## Option 2: Vercel (Recommended for Updates)

**Best for:** Automatic updates when you push to GitHub.

1. **Push your code to GitHub**.
2. **Go to Vercel**:
    Sign up at [vercel.com](https://vercel.com).
3. **Import Project**:
    Click "Add New..." -> "Project" -> Import from GitHub.
4. **Deploy**:
    Vercel detects it's a Vite project automatically. Just click "Deploy".

---

## Option 3: GitHub Pages

1. Go to your GitHub repository settings.
2. Pages -> Build and deployment -> Source: GitHub Actions.
3. Configure a static site workflow.
