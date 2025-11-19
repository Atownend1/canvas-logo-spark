--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



SET default_table_access_method = heap;

--
-- Name: demo_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.demo_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name text NOT NULL,
    company_name text NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    company_size text,
    phone text,
    country text DEFAULT 'United Kingdom'::text,
    interested_areas text[],
    source text DEFAULT 'landing_page'::text,
    status text DEFAULT 'new'::text,
    demo_token uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: demo_requests demo_requests_demo_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.demo_requests
    ADD CONSTRAINT demo_requests_demo_token_key UNIQUE (demo_token);


--
-- Name: demo_requests demo_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.demo_requests
    ADD CONSTRAINT demo_requests_pkey PRIMARY KEY (id);


--
-- Name: idx_demo_requests_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_demo_requests_email ON public.demo_requests USING btree (email);


--
-- Name: idx_demo_requests_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_demo_requests_token ON public.demo_requests USING btree (demo_token);


--
-- Name: demo_requests Anyone can submit demo requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can submit demo requests" ON public.demo_requests FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- Name: demo_requests; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


