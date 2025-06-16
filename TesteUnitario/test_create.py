import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time


@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless")  # Remova se quiser ver o navegador
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    yield driver
    driver.quit()

def preencher_formulario(driver, nome, email, email2, senha, senha2, telefone, cpf):
    driver.get("http://localhost:5000/create")
    driver.find_element(By.NAME, "nome").send_keys(nome)
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "email2").send_keys(email2)
    driver.find_element(By.NAME, "senha").send_keys(senha)
    driver.find_element(By.NAME, "senha2").send_keys(senha2)
    driver.find_element(By.NAME, "telefone").send_keys(telefone)
    driver.find_element(By.NAME, "cpf").send_keys(cpf)
    driver.find_element(By.TAG_NAME, "form").submit()
    time.sleep(1)

def test_senha_minima_valida(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-09")
    assert "Cadastro realizado com sucesso!" in driver.page_source

def test_senha_minima_invalida(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "1234567", "1234567", "(11) 91234-5678", "123.456.789-09")
    assert "Senha muito curta." in driver.page_source


def test_telefone_valido(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-09")
    assert "Cadastro realizado com sucesso!" in driver.page_source

def test_telefone_invalido(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "12345678", "12345678", "(11) 1234-5678", "123.456.789-09")
    assert "Telefone inválido." in driver.page_source

def test_cpf_valido(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-09")
    assert "Cadastro realizado com sucesso!" in driver.page_source

def test_cpf_invalido(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-00")
    assert "CPF inválido." in driver.page_source

def test_email_valido(driver):
    preencher_formulario(driver, "João", "teste@exemplo.com", "teste@exemplo.com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-09")
    assert "Cadastro realizado com sucesso!" in driver.page_source

def test_email_invalido(driver):
    preencher_formulario(driver, "João", "teste@exemplo@com", "teste@exemplo@com", "12345678", "12345678", "(11) 91234-5678", "123.456.789-09")
    assert "Email inválido" in driver.page_source or "Cadastro realizado com sucesso!" not in driver.page_source

def test_double_check_ok(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "senha123", "senha123", "(11) 91234-5678", "123.456.789-09")
    assert "Cadastro realizado com sucesso!" in driver.page_source

def test_double_check_erro(driver):
    preencher_formulario(driver, "João", "a@a.com", "a@a.com", "senha123", "senhaErrada", "(11) 91234-5678", "123.456.789-09")
    assert "Senhas não conferem." in driver.page_source

def test_cadastro_completo_valido(driver):
    preencher_formulario(driver, "Maria", "teste@teste.com.br", "teste@teste.com.br", "12345678", "12345678", "(75) 55544-4444", "210.830.180-19")
    assert "Cadastro realizado com sucesso!" in driver.page_source
