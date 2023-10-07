import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development"
import { API_URLS } from "../Services/ApiUrls"
import { useEffect, useState } from "react"
import { CustomAlert } from "../customAlerts/customAlert";
import { Paper, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export const HomePage = (params) => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            const { isSuccess, data } = await API_URLS.fetchProducts()
            if (isSuccess) {
                setProducts(data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Paper style={{ width: "80%", padding: '0px 30px 30px 30px', border: "1px solid black", display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", marginTop: '90px', marginBottom: '10px' }}>
            <h2>Available Products
                <Button
                    onClick={() => { navigate('/addproduct') }}>
                    <AddIcon />
                </Button>
            </h2 >
            <Table style={{ width: "100%" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Sr. No.</TableCell>
                        <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Name</TableCell>
                        <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Image</TableCell>
                        <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Description</TableCell>
                        <TableCell align='center' style={{ width: '20%', border: "1px solid black" }}>Price (₹)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length > 0 ?
                        products.map((product, idx) => {
                            return <TableRow key={product._id}>
                                <TableCell align='center' style={{ border: "1px solid black" }} >{idx + 1}</TableCell>
                                <TableCell align='center' style={{ border: "1px solid black" }} >{product.name}</TableCell>
                                <TableCell align='center' style={{ border: "1px solid black" }} >
                                    <img
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                        src={product.image}
                                        alt='Product Image' />
                                </TableCell>
                                <TableCell align='center' style={{ border: "1px solid black" }}>{product.description}</TableCell>
                                <TableCell align='center' style={{ border: "1px solid black" }}>{product.price}</TableCell>
                            </TableRow>
                        })
                        :
                        <TableRow>
                            <TableCell align="center" colSpan='5' style={{ border: "1px solid black", background: '#f0ead2' }}> No Product available</TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </Paper >
    )
}