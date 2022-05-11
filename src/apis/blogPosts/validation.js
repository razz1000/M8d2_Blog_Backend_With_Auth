import { checkSchema, validationresult } from "express-validator";
import createError from "http-errors";

const blogPostsSchema = {	
    category: {
        in: ["body"],
        isString: {
            errorMessage: "Category is a mandatory field to add and it must be of type string",
        },
    },
    title: {
        in: ["body"],
        isString: {
            errorMessage: "Title is a mandatory field to add and it must be of type string",
        },
    },
    cover: {
        in: ["body"],
        inString: {
            errorMessage: "Cover is a mandatory field to add and must be a string (the url string)",
        },
    },
    content: {
        in: ["body"],
        inString: {
            errorMessage: "Content is a mandatory field to add and must be a string",
        },
    },

/*     "readTime": {
        "value": 2,
      "unit": "minute"
     },
    "author": {
        "name": "AUTHOR AVATAR NAME",
        "avatar":"AUTHOR AVATAR LINK"
        },
     "content":"HTML",
     "createdAt": "NEW DATE" */
    }


    