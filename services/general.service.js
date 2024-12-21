import axios from "axios";

// const API_URL = "http://localhost/veggieking-api";
const API_URL = "https://api.veggieking.pk/public";

const login = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/login-user`,
        {
            phone: values.phone,
            password: values.password,
        },
        {
            headers: headers,
        }
    );
};

const register = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/user-register`,
        {
            name: values.name,
            address: values.address,
            phone: values.phone,
            email: values.email,
            password: values.password,
        },
        {
            headers: headers,
        }
    );
};

const forgot = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/forgot`,
        {
            email: values.email,
        },
        {
            headers: headers,
        }
    );
};

const submitMessage = (userId, message) => {
    const headers = {
        "Content-Type": "application/json",
    };
    console.log(userId, message);
    return axios.post(
        `${API_URL}/submit-message`,
        {
            created_by: userId,
            message: message,
        },
        {
            headers: headers,
        }
    );
};

const forgotOtp = (email) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/forgot`,
        {
            email: email,
        },
        {
            headers: headers,
        }
    );
};

const checkForgotToken = (token, email) => {
    // console.log(token, email);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/check-forgot/${token}/${email}`,
        {
            headers: headers,
        }
    );
};
const showProfile = (accessToken) => {
    return axios.get(`${API_URL}/profile`, {
        headers: authHeader(accessToken),
    });
};
const locationUpdate = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/location-update]${values.id}`,
        {
            latitude: values.latitude,
            longitude: values.longitude,
        },
        {
            headers: headers,
        }
    );
};

const smsVerification = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/sms-verify/${values.id}/${values.code}`,
        {
            headers: headers,
        }
    );
};

const emailVerification = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/email-verify/${values.id}/${values.code}`,
        {
            headers: headers,
        }
    );
};

const listCartByUserId = (id) => {
    // console.log(`id=${id}`);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-cart/${id}`,
        {
            headers: headers,
        }
    );
};

const cartCounterByUserId = (id) => {
    // console.log(`id=${id}`);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/cart-counter/${id}`,
        {
            headers: headers,
        }
    );
};

const addCart = (userId, prodId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/add-cart`, {
        created_by: userId,
        prod_id: prodId,
    },
        {
            headers: headers,
        }
    );
};

const increaseQty = (userId, prodId) => {
    console.log(userId, prodId);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/increase-quantity`, {
        created_by: userId,
        prod_id: prodId,
    },
        {
            headers: headers,
        }
    );
};

const decreaseQty = (userId, prodId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/decrease-quantity`, {
        created_by: userId,
        prod_id: prodId,
    },
        {
            headers: headers,
        }
    );
};

const deleteCart = (userId, prodId) => {
    const headers = {
        "Content-Type": "application/json",
    };

    const data = {
        created_by: userId,
        prod_id: prodId,
    };

    return axios.delete(
        `${API_URL}/delete-cart`,
        {
            headers: headers,
            data: data
        }
    );
};

const fetchProductByType = (type) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/fetch-product-by-type/${type}`,
        {
            headers: headers,
        }
    );
};

const listAllProducts = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-product`,
        {
            headers: headers,
        }
    );
};

const listProductByCat = (id) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-product-by-cat/${id}`,
        {
            headers: headers,
        }
    );
};

const listProductByCatCart = (id, userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-product-by-cat-cart/${id}/${userId}`,
        {
            headers: headers,
        }
    );
};

const listLimProductByCatCart = (id, userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-lim-product-by-cat-cart/${id}/${userId}`,
        {
            headers: headers,
        }
    );
};

const listFeaturedProductByCart = (userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-featured-product-by-cart/${userId}`,
        {
            headers: headers,
        }
    );
};

const listFeaturedProducts = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-featured-product`,
        {
            headers: headers,
        }
    );
};

const listAllCategories = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-categories`,
        {
            headers: headers,
        }
    );
};

const addProduct = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/add-product`, {
        name: values.name,
        image: values.image,
        price: values.price,
        type: values.type,
        created_by: values.user_id,
    },
        {
            headers: headers,
        }
    );
};

const addCategory = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/add-category`, {
        name: values.name,
        image: values.image,
        created_by: values.user_id,
    },
        {
            headers: headers,
        }
    );
};

const updateProduct = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/update-product/${values.id}`, {
        name: values.name,
        image: values.image,
        price: values.price,
        type: values.type,
        updated_by: values.user_id,
    },
        {
            headers: headers,
        }
    );
};

const deleteProduct = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.delete(
        `${API_URL}/delete-product`, {
        prod_id: values.prod_id,
        admin_id: values.user_id,
    },
        {
            headers: headers,
        }
    );
};

const placeOrder = (cart, userId, address, instruction) => {
    console.log(cart, userId, address, instruction);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.post(
        `${API_URL}/place-order-new`, {
        cart: cart,
        user_id: userId,
        address: address,
        instruction: instruction,
    },
        {
            headers: headers,
        }
    );
};

const listAllOrders = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-orders`,
        {
            headers: headers,
        }
    );
};

const listOrdersByUserIdandStatus = (status, userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-orders-user/${status}/${userId}`,
        {
            headers: headers,
        }
    );
};

const getUserById = (id) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/user/${id}`,
        {
            headers: headers,
        }
    );
};

const getNotification = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/notification`,
        {
            headers: headers,
        }
    );
};

const getSliders = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-sliders`,
        {
            headers: headers,
        }
    );
};

const getProductCartById = (id, userId) => {
    console.log(id, userId);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/product-cart/${id}/${userId}`,
        {
            headers: headers,
        }
    );
};

const updateUserById = (name, address, phone, email, userId) => {
    console.log(name, address, phone, email, userId);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/user/${userId}`, {
        name: name, address: address, phone: phone, email: email, updated_by: userId
    },
        {
            headers: headers,
        }
    );
};

const updatePasswordById = (current_password, new_password, userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    // console.log(current_password, new_password, userId);
    return axios.put(
        `${API_URL}/edit-password`, {
        id: userId, current_password: current_password, new_password: new_password
    },
        {
            headers: headers,
        }
    );
};

const updatePassword = (token, email, password) => {
    console.log(token, email, password);
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/update-password`, {
        token: token, email: email, password: password
    },
        {
            headers: headers,
        }
    );
};

const listOrdersByUserIdOngoing = (userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-orders-user-ongoing/${userId}`,
        {
            headers: headers,
        }
    );
};

const listOrdersByUserIdHistory = (userId) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-orders-user-history/${userId}`,
        {
            headers: headers,
        }
    );
};

const listOrdersDetailByOrderId = (id) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-order-dtl/${id}`,
        {
            headers: headers,
        }
    );
};

const updateOrderStatus = (orderId, status) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/order-status/${orderId}/${status}`,
        {
            headers: headers,
        }
    );
};

const orderInfoById = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/order-info/${values.id}`,
        {
            headers: headers,
        }
    );
};

const orderInfoForPrintById = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/order-info-print/${values.id}`,
        {
            headers: headers,
        }
    );
};

const updateOrderInfoById = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/order-status/${values.id}`, {
        custom_field: values.custom_field,
        custom_note: values.custom_note,
        created_at: values.created_at,
    },
        {
            headers: headers,
        }
    );
};

const listAllRiders = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-user/rider`,
        {
            headers: headers,
        }
    );
};

const assignOrderToRider = (values) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.put(
        `${API_URL}/order-rider`, {
        rider_id: values.rider_id,
        order_id: values.order_id,
        admin_id: values.admin_id,
    },
        {
            headers: headers,
        }
    );
};

const listOngoingAssignedOrderByRiderId = (id, status) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-rider-order-ongoing/${id}`,
        {
            headers: headers,
        }
    );
};

const listHistoryAssignedOrderByRiderId = (id, status) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/list-rider-order-history/${id}`,
        {
            headers: headers,
        }
    );
};

const sendNotification = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/send-notification`,
        {
            headers: headers,
        }
    );
};

const getCharges = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/get-charges`,
        {
            headers: headers,
        }
    );
};

const getMinCharges = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    return axios.get(
        `${API_URL}/get-min-charges`,
        {
            headers: headers,
        }
    );
};

const GeneralService = {
    login, register, forgot, forgotOtp, checkForgotToken, showProfile, locationUpdate, smsVerification, emailVerification, listCartByUserId,
    cartCounterByUserId, increaseQty, decreaseQty, deleteCart, fetchProductByType, listAllProducts, listProductByCat, listProductByCatCart,
    listLimProductByCatCart, listAllCategories, listFeaturedProducts, listFeaturedProductByCart, addProduct, updateProduct, deleteProduct, placeOrder, listAllOrders, listOrdersByUserIdandStatus,
    listOrdersDetailByOrderId, updateOrderStatus, orderInfoById, getMinCharges, orderInfoForPrintById, updateOrderInfoById, listAllRiders, assignOrderToRider, getUserById, getProductCartById, getNotification, getSliders, updateUserById, updatePasswordById, updatePassword,
    listHistoryAssignedOrderByRiderId, listOngoingAssignedOrderByRiderId, sendNotification, listOrdersByUserIdOngoing, listOrdersByUserIdHistory, addCart, getCharges, submitMessage
};
export default GeneralService;
