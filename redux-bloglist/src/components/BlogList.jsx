import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = [...useSelector(state => state.blogs)]

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell><b>Title</b></TableCell>
          <TableCell><b>Author</b></TableCell>
        </TableHead>
        <TableBody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList