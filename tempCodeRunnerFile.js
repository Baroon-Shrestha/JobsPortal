app.use(cors({
    origin: [process.env.frontend_url],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))