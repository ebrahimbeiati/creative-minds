// "use client";

// import { addPost } from "@/lib/action";
// import styles from "./adminPostForm.module.css";
// import { useActionState } from "react-dom";

// const AdminPostForm = ({ userId }) => {
//   const [state, formAction] = useActionState(addPost, undefined);

//   return (
//     <form action={formAction} className={styles.container}>
//       <h1>Add New Post</h1>
//       <input type="hidden" name="userId" value={userId} />
//       <input type="text" name="title" placeholder="Title" />
//       <input type="text" name="slug" placeholder="slug" />
//       <input type="text" name="img" placeholder="img" />
//       <textarea type="text" name="desc" placeholder="desc" rows={10} />
//       <button>Add</button>
//       {state?.error}
//     </form>
//   );
// };

// export default AdminPostForm;
"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useState } from "react";

const AdminPostForm = ({ userId }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Collect form data

    try {
      const result = await addPost(undefined, formData); // Call the addPost function

      if (result.error) {
        setError(result.error); // Set error if there is one
      } else {
        setSuccess(true); // Optionally handle successful addition
        e.target.reset(); // Clear form fields
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="slug" placeholder="Slug" required />
      <input type="text" name="img" placeholder="Image URL" />
      <textarea name="desc" placeholder="Description" rows={10} required />
      <button type="submit">Add</button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Post added successfully!</p>}
    </form>
  );
};

export default AdminPostForm;
